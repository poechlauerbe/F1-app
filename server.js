const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;

const { getDrivers, addDriver, updatePositions, updateGapToLeader, updateDriverLaps } = require('./services/obj_drivers');
const { getLocation, setLocation, updateActualLocationWeather } = require('./services/obj_location');
const { getLastWeather, addWeather } = require('./services/obj_weather');
const { addTeamradios, getTeamradios } = require('./services/obj_teamradio');
const { addLap, getLastLap } = require('./services/obj_laps');

let positionLastUpdate = 0;

app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
const driverRouter = require('./routes/drivers');
const leaderboardRouter = require('./routes/leaderboard');
const racecontrolRouter = require('./routes/racecontrol');
const teamradioRouter = require('./routes/teamradio');
const trackinfoRouter = require('./routes/trackinfo');
const trainingRouter = require('./routes/training');
const singleDriverRouter = require('./routes/singledriver');



// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the favicon
app.use('/favicon.ico', express.static('public/favicon.ico'));

// Use the routes defined in the route files
app.use(async (req, res, next) => {
    if (getDrivers().length === 0) {
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

app.use(async (req, res, next) => {
if (!getLocation()) {
    try {
    await loadLocation();
    next();
    } catch (error) {
    res.status(500).json({ error: 'Failed to initialize location' });
    }
} else {
    next();
}
});

app.use(async (req, res, next) => {
    if (!getLocation() || !getLastWeather()) {
        try {
        await loadWeather();
        next();
        } catch (error) {
        res.status(500).json({ error: 'Failed to initialize weather' });
        }
    } else {
        next();
    }
});

app.use(async (req, res, next) => {
    if (!getLocation() || !getLastWeather()) {
        try {
        await loadLaps();;
        next();
        } catch (error) {
        res.status(500).json({ error: 'Failed to initialize weather' });
        }
    } else {
        next();
    }
});

app.use('/', indexRouter);
app.use('/drivers', driverRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/racecontrol', racecontrolRouter);
app.use('/teamradio', teamradioRouter);
app.use('/trackinfo', trackinfoRouter);
app.use('/training', trainingRouter);
app.use('/singledriver', singleDriverRouter);

// API endpoints to fetch and return data;

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
            addLap(element['driver_number'], element['duration_sector_1'], element['duration_sector_2'], element['duration_sector_3'], element['lap_number']);
            updateDriverLaps(element['driver_number'], getLastLap(element['driver_number']))
        })
    } catch (error) {
        console.error('Error fetching data (laps):', error);
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
    await loadLaps();
    // console.log(getDrivers());
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

app.get('/api/sessions', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/sessions?session_key=latest');
        const data = await response.json();
        setLocation(data[0]['session_key'], data[0]['session_name'], data[0]['session_type'], data[0]['location'], data[0]['country_name'], data[0]['date_start'], data[0]['date_end'])
        console.log(getLocation())
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
