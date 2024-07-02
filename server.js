const express = require('express');
// const favicon = require('serve-favicon');
// const path = require('path');
const app = express();
const port = 3000;
let driverDataCache = null;

// Use the serve-favicon middleware
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
const driverRouter = require('./routes/drivers');
const leaderboardRouter = require('./routes/leaderboard');
const racecontrolRouter = require('./routes/racecontrol');
const teamradioRouter = require('./routes/teamradio');

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/drivers', driverRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/racecontrol', racecontrolRouter);
app.use('/teamradio', teamradioRouter);

// API endpoint to fetch and return data
app.get('/api/drivers', async (req, res) => {
    if (driverDataCache) {
        return res.json(driverDataCache);
    }
    try {
        const response = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
        const data = await response.json();
        driverDataCache = data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/positions', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/position?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
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

app.get('/api/teamradio', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/team_radio?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/intervals', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/intervals?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
