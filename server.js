const express = require('express');
const ical = require('ical');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;
let startProcess = true;
let lastLoading = 0;

const { getDrivers, getDriversByPositon, addDriver, updatePositions, updateGapToLeader, updateDriverLaps, updateDriverTyre } = require('./services/obj_drivers');
const { getLocation, setLocation, updateActualLocationWeather } = require('./services/obj_location');
const { getLastWeather, addWeather } = require('./services/obj_weather');
const { addTeamradios, getTeamradios, getTeamradiosLength } = require('./services/obj_teamradio');
const { addLap, delLaps, getLastLap, getPreLastLap } = require('./services/obj_laps');
const { getRacecontrol, addRacecontrol } = require('./services/obj_racecontrol');
const { getTimeNowIsoString } = require('./services/service_time');
const { getGpList, addGpList } = require('./services/obj_GP_list');
const { updateCarData, getCarData } = require('./services/obj_cardata');
const { addSchedule, getSchedule } = require('./services/obj_schedule');

app.set('view engine', 'ejs');

// Use the routes defined in the route files

const indexRouter = require('./routes/index');

const driverRouter = require('./routes/drivers');
const gplistRouter = require('./routes/gplist');
const laptimesRouter = require('./routes/laptimes');
const leaderboardRouter = require('./routes/leaderboard');
const pitRouter = require('./routes/pit');
const racecontrolRouter = require('./routes/racecontrol');
const singleDriverRouter = require('./routes/singledriver');
const teamradioRouter = require('./routes/teamradio');
const trackinfoRouter = require('./routes/trackinfo');


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the favicon
app.use('/favicon.ico', express.static('public/favicon.ico'));

app.use('/', indexRouter);

app.use('/drivers', driverRouter);
app.use('/gplist', gplistRouter);
app.use('/laptimes', laptimesRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/pit', pitRouter);
app.use('/racecontrol', racecontrolRouter);
app.use('/singledriver', singleDriverRouter);
app.use('/teamradio', teamradioRouter);
app.use('/trackinfo', trackinfoRouter);

loadIntervalsIsFetching = false;
loadLocationIsFetching = false;
loadStintsIsFetching = false;
loadLapsIsFetching = false;
loadPositionsIsFetching = false;
loadRaceControlIsFetching = false;
loadTeamRadioIsFetching = false;

// Function to start the regular updates

const startUpdateIntervals = (interval) => {
    setInterval(async () => {
        if (loadIntervalsIsFetching) return; // Prevent overlapping calls
        loadIntervalsIsFetching = true;

        await loadIntervals();

        loadIntervalsIsFetching = false;
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

const startUpdateLocation = (interval) => {
    setInterval(async () => {
        if (loadLocationIsFetching) return; // Prevent overlapping calls
        loadLocationIsFetching = true;

        await loadLocation();
        await loadWeather();

        loadLocationIsFetching = false;
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

const startUpdateStints = (interval) => {
    setInterval(async () => {
        if (loadStintsIsFetching) return; // Prevent overlapping calls
        loadStintsIsFetching = true;

        await loadStints();

        loadStintsIsFetching = false;
    }, interval);
};


const startUpdateTeamRadio = (interval) => {
    setInterval(async () => {
        if (loadTeamRadioIsFetching) return; // Prevent overlapping calls
        loadTeamRadioIsFetching = true;

        await loadTeamRadio();
        loadTeamRadioIsFetching = false;
    }, interval);
}

async function loadDrivers(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
        response_err = response;
        const data = await response.json();
        data.forEach(element => {
            addDriver(element['driver_number'], element['full_name'], element['country_code'], element['team_name'], element['team_colour'], element['headshot_url']);
        });
        if (startProcess) {
            let actualTime = new Date();
            console.log((actualTime - startLoading) + 'ms \tDrivers loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadDrivers: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        // console.error(new Date().toISOString() + ': Error fetching data (drivers):', error);
        if (retryCount < maxRetries) {
            console.error('Response error loadDrivers:\n' + response_err)
            console.error(getTimeNowIsoString() + `: loadDrivers: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadDrivers(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadLocation(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/sessions?session_key=latest');
        response_err = response;
        const data = await response.json();
        if (data[0]['location'])
            setLocation(data[0]['session_key'], data[0]['session_name'], data[0]['session_type'], data[0]['location'], data[0]['country_name'], data[0]['date_start'], data[0]['date_end'])
        else
            throw {};
        if (startProcess) {
            let actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tLocation loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadLocation: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        // console.error(new Date().toISOString() + ': Error fetching data (sessions):', error);
        if (retryCount < maxRetries) {
            console.error('Response error loadLocation:\n' + response_err);
            console.error(`\n`+ getTimeNowIsoString() + `: loadLocation: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadLocation(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadWeather(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/weather?session_key=latest');
        response_err = response;
        const data = await response.json();
        data.forEach( element => {
            addWeather(element['date'], element['air_temperature'], element['track_temperature'], element['humidity'], element['pressure'], element['wind_speed'], element['wind_direction'], element['rainfall']);
        })
        updateActualLocationWeather();
        if (startProcess) {
            let actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tWeather loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadWeather: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadWeather:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadWeather: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadWeather(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

// only during race
async function loadIntervals(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/intervals?session_key=latest');
        response_err = response;
        const data = await response.json();
        data.forEach(element => {
            updateGapToLeader(element['driver_number'], element['gap_to_leader'])
        })
        if (startProcess) {
            let actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tIntervals loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadIntervals: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadIntervals:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadIntervals: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadIntervals(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadLaps(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/laps?session_key=latest');
        response_err = response;
        const data = await response.json();
        delLaps();
        data.forEach(element => {
            addLap(element['driver_number'], element['duration_sector_1'], element['duration_sector_2'], element['duration_sector_3'], element['lap_number'], element['lap_duration']);
            updateDriverLaps(element['driver_number'], getLastLap(element['driver_number']))
        })
        if (startProcess) {
            let actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tLaps loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadLaps: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadLaps:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadLaps: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadLaps(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadMeetings(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err = null;
    try {
        const response = await fetch('https://api.openf1.org/v1/meetings');
        response_err = response;
        const data = await response.json();
        data.forEach(element => {
            addGpList(element['meeting_key'], element['circuit_short_name'], element['official_name'], element['country_name'], element['date_start'], element['gmt_offset']);
        })
        if (startProcess) {
            let actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tMeetings loaded');
            lastLoading = actualTime;
        }
        if (reload)
            console.log("loadMeetings: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadMeetings:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadMeetings: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadMeetings(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadPositions(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/position?session_key=latest');
        response_err = response;
        const data = await response.json();
        data.forEach( element => {
            updatePositions(element['driver_number'], element['position'])
        })
        if (startProcess) {
            let actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tPositions loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadPositions: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadPositions:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadPositions: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadPositions(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadRaceControl(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/race_control?session_key=latest');
        response_err = response;
        const data = await response.json();
        data.forEach(element => {
            addRacecontrol(element['category'], element['date'], element['driver_number'], element['flag'], element['lap_number'], element['message'], element['scope'], element['sector'])
        })
        if (startProcess) {
            actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tRacecontrol loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadRaceControl: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadRaceControl:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadRaceControl: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadRaceControl(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadStints(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/stints?session_key=latest');
        response_err = response;
        const data = await response.json();
        data.forEach(elem => {
            updateDriverTyre(elem['driver_number'], elem['compound'])
        })
        if (startProcess) {
            actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tStints loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadStints: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadStints:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadStints: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadStints(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadTeamRadio(retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/team_radio?session_key=latest');
        response_err = response;
        const data = await response.json();
        data.forEach(element => {
            addTeamradios(element['date'], element['driver_number'], element['recording_url']);
        })
        if (startProcess) {
            actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tTeamRadio loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log("loadTeamradio: done (" + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error loadTeamRadio:\n' + response_err);
            console.error(getTimeNowIsoString() + `: loadTeamRadio: Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadTeamRadio(retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadCarData(driverNumber, retryCount = 0, maxRetries = 5, delayMs = 3000, reload=false) {
    let response_err;
    try {
        const response = await fetch('https://api.openf1.org/v1/car_data?session_key=latest&driver_number=' + driverNumber);
        response_err = response;
        const data = await response.json();
        data.forEach(element => {
            updateCarData(element['driver_number'], element['date'], element['brake'], element['drs'], element['meeting_key'], element['n_gear'], element['rpm'], element['session_key'], element['speed'], element['throttle']);
        });
        if (startProcess) {
            actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tCarData loaded');
            lastLoading = actualTime;
        }
        if (reload && !startProcess)
            console.log(getTimeNowIsoString() + `: loadCarData (car ${driverNumber}): done (` + retryCount + "/" + maxRetries + ")");
    } catch (error) {
        if (retryCount < maxRetries) {
            console.error('Response error carData:\n' + response_err);
            console.error(getTimeNowIsoString() + `: carData (car ${driverNumber}): Retrying... (${retryCount + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await loadCarData(driverNumber, retryCount + 1, maxRetries, delayMs, true);
        } else {
            console.error('Max retries reached. Unable to fetch driver data.');
        }
    }
}

async function loadSchedule() {
    try {
        const response = await fetch('https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics');
        const icsText = await response.text();
        const events = ical.parseICS(icsText);

        for (const event of Object.values(events)) {
            addSchedule(event.summary, event.categories[0], new Date(event.start), new Date (event.end), event.location);
        }
        if (startProcess) {
            actualTime = new Date();
            console.log((actualTime - lastLoading) + 'ms \tSchedule loaded');
            lastLoading = actualTime;
        }
    } catch (error) {
        console.error('Error fetching data (schedule):', error);
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

app.get('/api/driversbyposition', async (req, res) => {
    if (getDrivers().length > 0) {
        return res.json(getDriversByPositon());
    }
    try {
        await loadDrivers();
        res.json(getDriversByPositon());
    } catch (error) {
        console.error(getTimeNowIsoString() + ': Error fetching data (drivers):', error);
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
        console.error(getTimeNowIsoString() + ': Error fetching data (drivers):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/singledriver', async (req, res) => {
    if (getCarData(1).length > 0) {
        return res.json(getCarData(1));
    }
    try {
        await loadCarData(1);
        res.json(getCarData(1));
    } catch (error) {
        console.error(getTimeNowIsoString() + ': Error fetching data (drivers):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/pit', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/pit?session_key=latest');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(new Date().toISOString() + ': Error fetching data (pit):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/gplist', async (req, res) => {
    if (getGpList().length > 0) {
        return res.json(getGpList());
    }
    try {
        await loadMeetings();
        res.json(getGpList());
    } catch (error) {
        console.error(getTimeNowIsoString() + ': Error fetching data (drivers):', error);
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
        console.error(getTimeNowIsoString() + ': Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/trackinfo', async (req, res) => {
    try {
        if(getLocation()) {
            return res.json(getLocation());
        }
        await loadLocation();
        res.json(getLocation());
    } catch (error) {
        console.error(getTimeNowIsoString() + ': Error fetching data (sessions):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/teamradio', async (req, res) => {
    try {
        if (getTeamradiosLength() > 0) {
            return res.json(getTeamradios());
        }
        await loadTeamRadio();
        res.json(getTeamradios());
    } catch (error) {
        console.error(new Date().toISOString() + ': Error fetching data (teamradio):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

let startLoading = new Date();
console.error(startLoading.toISOString() + ": Server loading ...\n");

async function serverStart() {
    await loadDrivers(); // no prerequesitary
    await loadLocation(); // no prerequesitary
    await loadLaps();
    await loadWeather();
    await loadPositions();
    await loadTeamRadio();
    await loadRaceControl();
    await loadStints();
    await loadIntervals();
    await loadMeetings();
    await loadSchedule();

    let endLoading = new Date();
    finishLoading = (endLoading - startLoading);
    console.error('\nLoading time: ' + finishLoading / 1000 + ' seconds\n');
    startProcess = false;
    // Server is ready to listen:
    app.listen(port, () => {
        console.error(endLoading.toISOString() + `: Server running at http://localhost:${port}`);
    });

    loadCarData(1);
    // Set intervalls to synchronize with API:
    startUpdateLocation(15010);
    startUpdateStints(5030);
    startUpdateLaps(5010);
    startUpdatePositions(4980);
    startUpdateIntervals(4870);
    startUpdateRaceControl(10050);
    startUpdateTeamRadio(13025);

    // Log the current time to stderr every 15 minutes
    setInterval(logTimeToStderr, 15 * 60 * 1000);
}

serverStart();

// move to services?
function logTimeToStderr() {
    const currentTime = new Date().toISOString();
    console.error(currentTime + ': Status OK');
}


// await Promise.all([startLogger(), startMetrics()]);
