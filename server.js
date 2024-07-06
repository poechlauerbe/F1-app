const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;
let startProcessFinished = 0;

const { getDrivers, getDriversByPositon, addDriver, updatePositions, updateGapToLeader, updateDriverLaps, updateDriverTyre } = require('./services/obj_drivers');
const { getLocation, setLocation, updateActualLocationWeather } = require('./services/obj_location');
const { getLastWeather, addWeather } = require('./services/obj_weather');
const { addTeamradios, getTeamradios } = require('./services/obj_teamradio');
const { addLap, getLastLap, getPreLastLap } = require('./services/obj_laps');
const { getRacecontrol, addRacecontrol } = require('./services/obj_racecontrol');

app.set('view engine', 'ejs');

// Use the routes defined in the route files
app.use(async (req, res, next) => {
    if (getDrivers().length < 5) {
      try {
        await loadDrivers();
        next();
      } catch (error) {
        res.status(500).json({ error: 'Failed to initialize drivers' });
      }
    } else {
      next();
    }
  });

const indexRouter = require('./routes/index');
const driverRouter = require('./routes/drivers');
const leaderboardRouter = require('./routes/leaderboard');
const racecontrolRouter = require('./routes/racecontrol');
const teamradioRouter = require('./routes/teamradio');
const trackinfoRouter = require('./routes/trackinfo');
const laptimesRouter = require('./routes/laptimes');
const singleDriverRouter = require('./routes/singledriver');


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
app.use('/laptimes', laptimesRouter);
app.use('/singledriver', singleDriverRouter);

loadLocationIsFetching = false;
loadStintsIsFetching = false;
loadLapsIsFetching = false;
loadPositionsIsFetching = false;
loadRaceControlIsFetching = false;
loadTeamRadioIsFetching = false;

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

const startUpdatePositions = (interval) => {
    setInterval(async () => {
        if (loadPositionsIsFetching) return; // Prevent overlapping calls
        loadPositionsIsFetching = true;

        await loadPositions();

        loadPositionsIsFetching = false;
    }, interval);
};

const startUpdateRaceControl = (interval) => {
    setInterval(async () => {
        if (loadRaceControlIsFetching) return; // Prevent overlapping calls
        loadRaceControlIsFetching = true;

        await loadRaceControl();
        loadRaceControlIsFetching = false;
    }, interval);
}

const startUpdateTeamRadio = (interval) => {
    setInterval(async () => {
        if (loadTeamRadioIsFetching) return; // Prevent overlapping calls
        loadTeamRadioIsFetching = true;

        await loadTeamRadio();
        loadTeamRadioIsFetching = false;
    }, interval);
}

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

// only during race
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

async function loadPositions() {
    try {
        const response = await fetch('https://api.openf1.org/v1/position?session_key=latest');
        const data = await response.json();
        data.forEach( element => {
            updatePositions(element['driver_number'], element['position'])
        })
    } catch (error) {
        console.error('Error fetching data (positions):', error);
    }
}

async function loadRaceControl() {
    try {
        const response = await fetch('https://api.openf1.org/v1/race_control?session_key=latest');
        const data = await response.json();
        data.forEach(element => {
            addRacecontrol(element['category'], element['date'], element['driver_number'], element['flag'], element['lap_number'], element['message'], element['scope'], element['sector'])
        })
    } catch (error) {
        console.error('Error fetching data:', error);
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

async function loadTeamRadio() {
    try {
        const response = await fetch('https://api.openf1.org/v1/team_radio?session_key=latest');
        const data = await response.json();
        data.forEach(element => {
            addTeamradios(element['date'], element['driver_number'], element['recording_url']);
        })
    } catch (error) {
        console.error('Error fetching data (teamradio):', error);
    }
}


// app.get('/api/car_data', async (req, res) => {
//     try {
//         const response = await fetch('https://api.openf1.org/v1/car_data?session_key=latest');
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching data (car_data):', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.get('/api/drivers', async (req, res) => {
    if (getDrivers().length > 0) {
        return res.json(getDriversByPositon());
    }
    try {
        await loadDrivers();
        res.json(getDriversByPositon());
    } catch (error) {
        console.error('Error fetching data (drivers):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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

app.get('/api/race_control', async (req, res) => {
    try {
        if (getRacecontrol().length > 0) {
            return res.json(getRacecontrol());
        }
        await loadRaceControl();
        res.json(getRacecontrol());
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/trackinfo', async (req, res) => {
    try {
        if(getLocation().length > 0) {
            return res.json(getLocation());
        }
        await loadLocation();
        res.json(getLocation());
    } catch (error) {
        console.error('Error fetching data (sessions):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/api/stints', async (req, res) => {
//     try {
//         const response = await fetch('https://api.openf1.org/v1/stints?session_key=latest');
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching data (stints):', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.get('/api/teamradio', async (req, res) => {
    try {
        if (getTeamradios().length > 0) {
            return res.json(getTeamradios());
        }
        await loadTeamRadio();
        res.json(getTeamradios());
    } catch (error) {
        console.error('Error fetching data (teamradio):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

let startLoading = new Date();
console.error(startLoading.toISOString() + ": Server loading ...");

async function serverStart() {
    await loadDrivers(); // no prerequesitary
    await loadLocation(); // no prerequesitary
    await loadLaps();
    await loadWeather();
    await loadPositions();
    await loadTeamRadio();
    await loadRaceControl();
    await loadStints();

    let endLoading = new Date();
    finishLoading = (endLoading - startLoading);
    console.error('\nLoading time: ' + finishLoading / 1000 + ' seconds\n');
    // Server is ready to listen:
    app.listen(port, () => {
        console.error(endLoading.toISOString() + `: Server running at http://localhost:${port}`);
    });
    // Set intervalls to synchronize with API:
    startUpdateLocation(15010);
    startUpdateStints(5030);
    startUpdateLaps(5010);
    startUpdatePositions(4980);
    startUpdateRaceControl(10050);
    startUpdateTeamRadio(13025);

    // Log the current time to stderr every 15 minutes
    setInterval(logTimeToStderr, 15 * 60 * 1000);
}

serverStart();

// move to services?
function logTimeToStderr() {
    const currentTime = new Date().toISOString();
    console.error(currentTime);
}


// await Promise.all([startLogger(), startMetrics()]);