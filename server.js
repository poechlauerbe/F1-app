const express = require('express');
const ical = require('ical');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 3000;
let startProcess = true;
let lastLoading = 0;

// let lastLoadingCarData = [];
let sessionId = 0;

const {
  addDriver,
  deleteDrivers,
  getDriverNumbers,
  getDrivers,
  getDriversByPositon,
  updatePositions,
  updateGapToLeader,
  updateDriverLaps,
  updateDriverTyre
} = require('./services/obj_drivers');

const {
  getLocation,
  setLocation,
  updateActualLocationWeather
} = require('./services/obj_location');

const { deleteWeather, addWeather } = require('./services/obj_weather');

const {
  deleteTeamradios,
  addTeamradios,
  getTeamradios,
  getTeamradiosLength
} = require('./services/obj_teamradio');

const {
  deleteLaps,
  addLap,
  getLastLap
} = require('./services/obj_laps');

const {
  deleteRacecontrol,
  getRacecontrol,
  addRacecontrol
} = require('./services/obj_racecontrol');

const { getTimeNowIsoString } = require('./services/service_time');
const { getGpList, addGpList } = require('./services/obj_GP_list');

const {
  deleteCarData,
  updateCarData,
  getLast100CarData
} = require('./services/obj_cardata');

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

let loadIntervalsIsFetching = false;
let loadLocationIsFetching = false;
let loadStintsIsFetching = false;
let loadLapsIsFetching = false;
let loadPositionsIsFetching = false;
let loadRaceControlIsFetching = false;
let loadTeamRadioIsFetching = false;
let loadCarDataIsFetching = false;

let stintsInterval = 0;
let lapsInterval = 0;
let positionsInterval = 0;
let intervalsInterval = 0;
let racecontrolInterval = 0;
let teamradioInterval = 0;

// Function to start the regular updates

const startUpdateIntervals = interval => {
  intervalsInterval = setInterval(async () => {
    if (loadIntervalsIsFetching) return; // Prevent overlapping calls
    loadIntervalsIsFetching = true;

    await loadIntervals();

    loadIntervalsIsFetching = false;
  }, interval);
};

const startUpdateLaps = interval => {
  lapsInterval = setInterval(async () => {
    if (loadLapsIsFetching) return; // Prevent overlapping calls
    loadLapsIsFetching = true;

    await loadLaps();

    loadLapsIsFetching = false;
  }, interval);
};

const startUpdateLocation = interval => {
  setInterval(async () => {
    if (loadLocationIsFetching) return; // Prevent overlapping calls
    loadLocationIsFetching = true;

    await loadLocation();
    await loadWeather();

    loadLocationIsFetching = false;
  }, interval);
};

const startUpdatePositions = interval => {
  positionsInterval = setInterval(async () => {
    if (loadPositionsIsFetching) return; // Prevent overlapping calls
    loadPositionsIsFetching = true;

    await loadPositions();

    loadPositionsIsFetching = false;
  }, interval);
};

const startUpdateRaceControl = interval => {
  racecontrolInterval = setInterval(async () => {
    if (loadRaceControlIsFetching) return; // Prevent overlapping calls
    loadRaceControlIsFetching = true;

    await loadRaceControl();
    loadRaceControlIsFetching = false;
  }, interval);
};

const startUpdateStints = interval => {
  stintsInterval = setInterval(async () => {
    if (loadStintsIsFetching) return; // Prevent overlapping calls
    loadStintsIsFetching = true;

    await loadStints();

    loadStintsIsFetching = false;
  }, interval);
};

const startUpdateTeamRadio = interval => {
  teamradioInterval = setInterval(async () => {
    if (loadTeamRadioIsFetching) return; // Prevent overlapping calls
    loadTeamRadioIsFetching = true;

    await loadTeamRadio();
    loadTeamRadioIsFetching = false;
  }, interval);
};

const startUpdateAllCarData = interval => {
  setInterval(async () => {
    if (loadCarDataIsFetching) return;
    loadCarDataIsFetching = true;

    await loadAllCarData();
    loadCarDataIsFetching = false;
  }, interval);
};

async function loadDrivers (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/drivers?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      addDriver(
        element.driver_number,
        element.full_name,
        element.country_code,
        element.team_name,
        element.team_colour,
        element.headshot_url
      );
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - startLoading + 'ms \tDrivers loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log('loadDrivers: done (' + retryCount + '/' + maxRetries + ')');
    }
  } catch (error) {
    // console.error(new Date().toISOString() + ': Error fetching data (drivers):', error);
    if (retryCount < maxRetries) {
      console.error('Response error loadDrivers:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadDrivers: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadDrivers(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

let loadLocationTimes = 0;

async function loadLocation (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    console.log(loadLocationTimes + '...' + sessionId);
    const response = await fetch(
      'https://api.openf1.org/v1/sessions?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    // if (!data[0].session_key) throw new Error('No session key found');

    if (data[0].session_key !== sessionId) {
      setLocation(
        data[0].session_key,
        data[0].session_name,
        data[0].session_type,
        data[0].location,
        data[0].country_name,
        data[0].date_start,
        data[0].date_end
      );
      console.log('old sessionID: ' + sessionId);
      sessionId = data[0].session_key;
      console.log(
        'new sessionID: ' + sessionId + ' (change at: ' + new Date() + ')'
      );
      if (!startProcess) {
        // stop update, delete objects, load new files, start update
        console.log('\n\nChange detected, reloading data\n\n');
        clearInterval(intervalsInterval);
        clearInterval(lapsInterval);
        clearInterval(stintsInterval);
        clearInterval(positionsInterval);
        clearInterval(teamradioInterval);
        clearInterval(racecontrolInterval);
        console.log('Intervals cleared');

        deleteLaps();
        deleteCarData();
        deleteDrivers();
        deleteRacecontrol();
        deleteTeamradios();
        deleteWeather();
        console.log('Objects deleted');

        startProcess = true;
        await loadDrivers(); // no prerequesitary
        await loadLaps();
        await loadWeather();
        await loadPositions();
        await loadTeamRadio();
        await loadRaceControl();
        await loadStints();
        await loadIntervals();
        await loadAllCarData();
        startProcess = false;
        console.log('Objects reloaded');

        // check if function for this
        startUpdateStints(5030);
        startUpdateLaps(5010);
        startUpdatePositions(4980);
        startUpdateIntervals(4870);
        startUpdateRaceControl(10050);
        startUpdateTeamRadio(13025);
        startUpdateAllCarData(7000);
        console.log('Intervals restarted');
      }
    }
    loadLocationTimes++;
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tLocation loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log('loadLocation: done (' + retryCount + '/' + maxRetries + ')');
    }
  } catch (error) {
    // console.error(new Date().toISOString() + ': Error fetching data (sessions):', error);
    if (retryCount < maxRetries) {
      console.error('Response error loadLocation:\n' + responseError);
      console.error(
        '\n' +
          getTimeNowIsoString() +
          `: loadLocation: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadLocation(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch location data.');
    }
  }
}

async function loadWeather (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/weather?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      addWeather(
        element.date,
        element.air_temperature,
        element.track_temperature,
        element.humidity,
        element.pressure,
        element.wind_speed,
        element.wind_direction,
        element.rainfall
      );
    });
    updateActualLocationWeather();
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tWeather loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log('loadWeather: done (' + retryCount + '/' + maxRetries + ')');
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadWeather:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadWeather: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadWeather(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

// only during race
async function loadIntervals (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/intervals?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      updateGapToLeader(element.driver_number, element.gap_to_leader);
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tIntervals loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log(
        'loadIntervals: done (' + retryCount + '/' + maxRetries + ')'
      );
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadIntervals:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadIntervals: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadIntervals(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadLaps (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/laps?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    deleteLaps();
    data.forEach(element => {
      addLap(
        element.driver_number,
        element.duration_sector_1,
        element.duration_sector_2,
        element.duration_sector_3,
        element.lap_number,
        element.lap_duration
      );
      updateDriverLaps(
        element.driver_number,
        getLastLap(element.driver_number)
      );
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tLaps loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log('loadLaps: done (' + retryCount + '/' + maxRetries + ')');
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadLaps:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadLaps: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadLaps(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadMeetings (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError = null;
  try {
    const response = await fetch('https://api.openf1.org/v1/meetings');
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      addGpList(
        element.meeting_key,
        element.circuit_short_name,
        element.official_name,
        element.country_name,
        element.date_start,
        element.gmt_offset
      );
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tMeetings loaded');
      lastLoading = actualTime;
    }
    if (reload) {
      console.log('loadMeetings: done (' + retryCount + '/' + maxRetries + ')');
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadMeetings:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadMeetings: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadMeetings(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadPositions (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/position?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      updatePositions(element.driver_number, element.position);
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tPositions loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log(
        'loadPositions: done (' + retryCount + '/' + maxRetries + ')'
      );
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadPositions:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadPositions: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadPositions(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadRaceControl (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/race_control?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      addRacecontrol(
        element.category,
        element.date,
        element.driver_number,
        element.flag,
        element.lap_number,
        element.message,
        element.scope,
        element.sector
      );
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tRacecontrol loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log(
        'loadRaceControl: done (' + retryCount + '/' + maxRetries + ')'
      );
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadRaceControl:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadRaceControl: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadRaceControl(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadStints (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/stints?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    data.forEach(elem => {
      updateDriverTyre(elem.driver_number, elem.compound);
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tStints loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log('loadStints: done (' + retryCount + '/' + maxRetries + ')');
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadStints:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadStints: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadStints(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadTeamRadio (
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/team_radio?session_key=latest'
    );
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      addTeamradios(
        element.date,
        element.driver_number,
        element.recording_url
      );
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tTeamRadio loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log(
        'loadTeamradio: done (' + retryCount + '/' + maxRetries + ')'
      );
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error loadTeamRadio:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: loadTeamRadio: Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadTeamRadio(retryCount + 1, maxRetries, delayMs, true);
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadCarData (
  driverNumber,
  retryCount = 0,
  maxRetries = 5,
  delayMs = 3000,
  reload = false
) {
  let responseError;
  try {
    const apiString =
      'https://api.openf1.org/v1/car_data?session_key=latest&driver_number=' +
      driverNumber;
    const response = await fetch(apiString);
    responseError = response;
    const data = await response.json();
    data.forEach(element => {
      updateCarData(
        element.driver_number,
        element.date,
        element.brake,
        element.drs,
        element.meeting_key,
        element.n_gear,
        element.rpm,
        element.session_key,
        element.speed,
        element.throttle
      );
    });
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tCarData loaded');
      lastLoading = actualTime;
    }
    if (reload && !startProcess) {
      console.log(
        getTimeNowIsoString() +
        `: loadCarData (car ${driverNumber}): done (` +
        retryCount +
        '/' +
        maxRetries +
        ')'
      );
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.error('Response error carData:\n' + responseError);
      console.error(
        getTimeNowIsoString() +
          `: carData (car ${driverNumber}): Retrying... (${retryCount + 1}/${maxRetries})`
      );
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await loadCarData(
        driverNumber,
        retryCount + 1,
        maxRetries,
        delayMs,
        true
      );
    } else {
      console.error('Max retries reached. Unable to fetch driver data.');
    }
  }
}

async function loadAllCarData () {
  const driverNumbers = getDriverNumbers();

  driverNumbers.forEach(element => {
    loadCarData(element);
  })
}



async function loadSchedule () {
  try {
    const response = await fetch(
      'https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics'
    );
    const icsText = await response.text();
    const events = ical.parseICS(icsText);

    for (const event of Object.values(events)) {
      addSchedule(
        event.summary,
        event.categories[0],
        new Date(event.start),
        new Date(event.end),
        event.location,
        event.geo.lat,
        event.geo.lon
      );
    }
    if (startProcess) {
      const actualTime = new Date();
      console.log(actualTime - lastLoading + 'ms \tSchedule loaded');
      lastLoading = actualTime;
    }
  } catch (error) {
    console.error('Error fetching data (schedule):', error);
  }
}

app.get('/api/driversbyposition', async (req, res) => {
  if (getDrivers().length > 0) {
    return res.json(getDriversByPositon());
  }
  try {
    await loadDrivers();
    res.json(getDriversByPositon());
  } catch (error) {
    console.error(
      getTimeNowIsoString() + ': Error fetching data (drivers):',
      error
    );
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
    console.error(
      getTimeNowIsoString() + ': Error fetching data (drivers):',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/singledriver', async (req, res) => {
  const driverNumber = req.query.driverNumber;
  const driverNumbers = getDriverNumbers();
  const checkInput = driverNumbers.find(one => one === Number(driverNumber));
  if (!checkInput) return res.json(null);
  if (
    getLast100CarData(driverNumber) &&
    getLast100CarData(driverNumber).length > 0
  ) {
    return res.json(getLast100CarData(driverNumber));
  }
  try {
    await loadCarData(driverNumber);
    res.json(getLast100CarData(driverNumber));
  } catch (error) {
    console.error(
      getTimeNowIsoString() + ': Error fetching data (drivers):',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/pit', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.openf1.org/v1/pit?session_key=latest'
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(
      new Date().toISOString() + ': Error fetching data (pit):',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/oldgplist', async (req, res) => {
  if (getGpList().length > 0) {
    return res.json(getGpList());
  }
  try {
    await loadMeetings();
    res.json(getGpList());
  } catch (error) {
    console.error(
      getTimeNowIsoString() + ': Error fetching data (drivers):',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/schedule', async (req, res) => {
  if (getSchedule().length > 0) {
    return res.json(getSchedule());
  }
  try {
    await loadSchedule();
    res.json(getSchedule());
  } catch (error) {
    console.error(
      getTimeNowIsoString() + ': Error fetching data (drivers):',
      error
    );
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
    if (getLocation()) {
      return res.json(getLocation());
    }
    await loadLocation();
    res.json(getLocation());
  } catch (error) {
    console.error(
      getTimeNowIsoString() + ': Error fetching data (sessions):',
      error
    );
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
    console.error(
      new Date().toISOString() + ': Error fetching data (teamradio):',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const startLoading = new Date();
console.error(startLoading.toISOString() + ': Server loading ...\n');

async function serverStart () {
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

  const endLoading = new Date();
  const finishLoading = endLoading - startLoading;
  console.error('\nLoading time: ' + finishLoading / 1000 + ' seconds\n');

  // Server is ready to listen:
  app.listen(port, () => {
    console.error(
      endLoading.toISOString() + `: Server running at http://localhost:${port}`
    );
  });

  // CarData loading after opening port:
  // await loadAllCarData();

  startProcess = false;
  // Set intervalls to synchronize with API:

  startUpdateLocation(15010);
  startUpdateStints(5030);
  startUpdateLaps(5010);
  startUpdatePositions(4980);
  startUpdateIntervals(4870);
  startUpdateRaceControl(10050);
  startUpdateTeamRadio(13025);
  // startUpdateAllCarData(7000);

  // Log the current time to stderr every 15 minutes
  setInterval(logTimeToStderr, 15 * 60 * 1000);
}

serverStart();

// move to services?
function logTimeToStderr () {
  const currentTime = new Date().toISOString();
  console.error(currentTime + ': Status OK');
}

// await Promise.all([startLogger(), startMetrics()]);
