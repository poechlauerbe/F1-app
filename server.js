const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;
let startProcessFinished = 0;

const { getDrivers, addDriver, updatePositions, updateGapToLeader, updateDriverLaps, updateDriverTyre } = require('./services/obj_drivers');
const { getLocation, setLocation, updateActualLocationWeather } = require('./services/obj_location');
const { getLastWeather, addWeather } = require('./services/obj_weather');
const { addTeamradios, getTeamradios } = require('./services/obj_teamradio');
const { addLap, getLastLap, getPreLastLap } = require('./services/obj_laps');

app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
const driverRouter = require('./routes/drivers');
const leaderboardRouter = require('./routes/leaderboard');
const racecontrolRouter = require('./routes/racecontrol');
const teamradioRouter = require('./routes/teamradio');
const trackinfoRouter = require('./routes/trackinfo');
const trainingRouter = require('./routes/training');
const singleDriverRouter = require('./routes/singledriver');

// Use the routes defined in the route files
// app.use(async (req, res, next) => {
//     if (getDrivers().length === 0) {
//       try {
//         await loadDrivers();
//         console.log('Driver loaded')
//         next();
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to initialize drivers' });
//       }
//     } else {
//       next();
//     }
//   });

// app.use(async (req, res, next) => {
// if (!getLocation()) {
//     try {
//     await loadLocation();
//     console.log('Location loaded')
//     next();
//     } catch (error) {
//     res.status(500).json({ error: 'Failed to initialize location' });
//     }
// } else {
//     next();
// }
// });

// app.use(async (req, res, next) => {
//     if (!getLastLap()) {
//         try {
//         await loadLaps();
//         console.log('Laps loaded')
//         next();
//         } catch (error) {
//         res.status(500).json({ error: 'Failed to initialize weather' });
//         }
//     } else {
//         next();
//     }
// });

// app.use(async (req, res, next) => {
//     if (getLocation() && !getLastWeather()) {
//         try {
//         await loadWeather();
//         console.log('Weather loaded')
//         next();
//         } catch (error) {
//         res.status(500).json({ error: 'Failed to initialize weather' });
//         }
//     } else {
//         next();
//     }
// });



// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the favicon
app.use('/favicon.ico', express.static('public/favicon.ico'));

app.use('/', indexRouter);
app.use('/drivers', driverRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/racecontrol', racecontrolRouter);
app.use('/teamradio', teamradioRouter);
app.use('/trackinfo', trackinfoRouter);
app.use('/training', trainingRouter);
app.use('/singledriver', singleDriverRouter);

// API endpoints to fetch and return data;

// setInterval(loadIntervals(), 5000);
// setInterval(loadWeather(), 15000);


let loadLocationIsFetching = true;
let loadStintsIsFetching = true;
let loadLapsIsFetching = true;

// Function to start the regular updates
const startUpdateLocation = (interval) => {
    setInterval(async () => {
        if (loadLocationIsFetching) return; // Prevent overlapping calls
        loadLocationIsFetching = true;

        await loadLocation();
        await loadWeather();

        loadLocationIsFetching = false;
    }, interval);
};

const startUpdateStints = (interval) => {
    setInterval(async () => {
        if (loadStintsIsFetching) return; // Prevent overlapping calls
        loadStintsIsFetching = true;

        await loadStints();

        loadStintsIsFetching = false;
    }, interval);
};

const startUpdateLaps = (interval) => {
    setInterval(async () => {
        if (loadLapsIsFetching) return; // Prevent overlapping calls
        loadLapsIsFetching = true;

        await loadLaps();

        loadLapsIsFetching = false;
    }, interval);
};

startUpdateLocation(15000);
startUpdateStints(5000);
startUpdateLaps(5000);

async function loadDrivers() {
    try {
        const response = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
        const data = await response.json();
        data.forEach(element => {
            addDriver(element['driver_number'], element['full_name'], element['country_code'], element['team_name'], element['team_colour'], element['headshot_url']);
        });
    } catch (error) {
        console.error('Error fetching data (drivers):', error);
    }
}

async function loadLocation() {
    try {
        const response = await fetch('https://api.openf1.org/v1/sessions?session_key=latest');
        const data = await response.json();
        setLocation(data[0]['session_key'], data[0]['session_name'], data[0]['session_type'], data[0]['location'], data[0]['country_name'], data[0]['date_start'], data[0]['date_end'])
    } catch (error) {
        console.error('Error fetching data (sessions):', error);
    }
}




async function loadWeather() {
    try {
        const response = await fetch('https://api.openf1.org/v1/weather?session_key=latest');
        const data = await response.json();
        data.forEach( element => {
            addWeather(element['date'], element['air_temperature'], element['track_temperature'], element['humidity'], element['pressure'], element['wind_speed'], element['wind_direction'], element['rainfall']);
        })
        updateActualLocationWeather();
    } catch (error) {
        console.error('Error fetching data (weather):', error);
    }
}

async function loadIntervals() {
    try {
        const response = await fetch('https://api.openf1.org/v1/intervals?session_key=latest');
        const data = await response.json();
        data.forEach(element => {
            updateGapToLeader(element['driver_number'], element['gap_to_leader'])
        })
    } catch (error) {
        console.error('Error fetching data (intervals):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function loadLaps() {
    try {
        const response = await fetch('https://api.openf1.org/v1/laps?session_key=latest');
        const data = await response.json();
        data.forEach(element => {
            addLap(element['driver_number'], element['duration_sector_1'], element['duration_sector_2'], element['duration_sector_3'], element['lap_number'], element['lap_duration']);
            updateDriverLaps(element['driver_number'], getLastLap(element['driver_number']))
        })
    } catch (error) {
        console.error('Error fetching data (laps):', error);
    }
}

async function loadStints() {
    try {
        const response = await fetch('https://api.openf1.org/v1/stints?session_key=latest');
        const data = await response.json();
        data.forEach(elem => {
            updateDriverTyre(elem['driver_number'], elem['compound'])
        })
    } catch (error) {
        console.error('Error fetching data (stints):', error);
    }
}

app.get('/api/car_data', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/car_data?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data (car_data):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/drivers', async (req, res) => {
    if (getDrivers().length > 0) {
        return res.json(getDrivers());
    }
    try {
        await loadDrivers();
        res.json(getDrivers());
    } catch (error) {
        console.error('Error fetching data (drivers):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/api/intervals', async (req, res) => {
//     try {
//         const response = await fetch('https://api.openf1.org/v1/intervals?session_key=latest');
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching data (intervals):', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// update possible with request like this: curl 'https://api.openf1.org/v1/intervals?session_key=latest&date>2024-06-30T14:31:28.0'
// });


app.get('/api/laps', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/laps?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data (laps):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/pit', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/pit?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data (pit):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/positions', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/position?session_key=latest');
        const data = await response.json();
        await loadIntervals();
        data.forEach( element => {
            updatePositions(element['driver_number'], element['position'])
        })
        res.json(getDrivers());
    } catch (error) {
        console.error('Error fetching data (positions):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/race_control', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/race_control?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/trackinfo', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/sessions?session_key=latest');
        const data = await response.json();
        res.json(getLocation());
    } catch (error) {
        console.error('Error fetching data (sessions):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/stints', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/stints?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data (stints):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/teamradio', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/team_radio?session_key=latest');
        const data = await response.json();
        data.forEach(element => {
            addTeamradios(element['date'], element['driver_number'], element['recording_url']);
        })
        res.json(getTeamradios());
    } catch (error) {
        console.error('Error fetching data (teamradio):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/weather', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/weather?session_key=latest');
        const data = await response.json();
        data.forEach( element => {
            addWeather(element['date'], element['air_temperature'], element['track_temperature'], element['humidity'], element['pressure'], element['wind_speed'], element['wind_direction'], element['rainfall']);
        })
        res.json(getLastWeather());
    } catch (error) {
        console.error('Error fetching data (weather):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

loadDrivers();
loadLocation();
loadWeather();

loadLocationIsFetching = false;
loadStintsIsFetching = false;
loadLapsIsFetching = false;
