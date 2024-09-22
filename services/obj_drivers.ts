function Driver (
  number,
  name,
  photoUrl,
  country,
  team,
  teamColor,
  position,
  lapCount,
  gapToLeader,
  lastLap,
  fastestLap,
  tyre
) {
  this.number = number;
  this.name = name || '';
  this.photoUrl = photoUrl || '';
  this.country = country || '';
  this.team = team || '';
  this.teamColor = teamColor || '';
  this.position = position || 0;
  this.lapCount = lapCount || 0;
  this.gapToLeader = gapToLeader || '';
  this.actualLap = {
    driverNumber: number,
    timeS1: 'no time',
    timeS2: 'no time',
    timeS3: 'no time',
    lapNr: '',
    lapTime: 'no time',
    tyre: ''
  };
  this.lastLap = lastLap || {
    driverNumber: number,
    timeS1: 'no time',
    timeS2: 'no time',
    timeS3: 'no time',
    lapNr: '',
    lapTime: 'no time',
    tyre: ''
  };
  this.fastestLap = fastestLap || {
    driverNumber: number,
    timeS1: 'no time',
    timeS2: 'no time',
    timeS3: 'no time',
    lapNr: '',
    lapTime: 'no time',
    tyre: ''
  };
  this.laps = [];
  this.tyre = tyre || '';
  this.pits = [];
  // check update depending on session key
}

let drivers = [];

const getDriverPits = driverNumber => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  return driver.pits;
};

const getDrivers = () => {
  return drivers;
};

const getDriverData = (driverNumber) => {
  // console.log(driverNumber);
  const driver = drivers.find(driver => driver.number === driverNumber);
  if (driver) {
    return driver;
  }
  return null;
};

const getDriverNumbers = () => {
  const driverNumbers = [];
  drivers.forEach(element => {
    driverNumbers.push(element.number);
  });
  return driverNumbers;
};

const getDriversByPositon = () => {
  const driversSorted = [];
  for (let i = 1; i <= drivers.length; i++) {
    const driver = drivers.find(driver => driver.position === i);
    driversSorted.push(driver);
  }
  return driversSorted;
};

const getDriverName = driverNumber => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  return driver.name;
};

const getDriverLastLap = driverNumber => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  return driver.lastLap;
};

const getFastestLap = driverNumber => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  return driver.lastLap;
};

const getDriverGapToLeader = driverNumber => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  return driver.gapToLeader;
};

const addDriver = (
  driverNumber,
  driverName,
  driverCountry,
  team,
  teamColor,
  photoUrl
) => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  if (!driver) {
    drivers.push(
      new Driver(
        driverNumber,
        driverName,
        photoUrl,
        driverCountry,
        team,
        teamColor
      )
    );
  }
};

const updatePositions = (driverNumber, position) => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  driver.position = position;
};

const updateGapToLeader = (driverNumber, newGap) => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  if (!driver) {
    console.error();
    console.error(`${driverNumber}: updateGapToLeader: driver not found`);
    return null;
  }
  driver.gapToLeader = newGap;
};

const updateDriverLaps = (driverNumber, newLap) => {
  if (!driverNumber || !newLap) return null;
  const driver = drivers.find(driver => driver.number === driverNumber);
  if (!driver) {
    console.error(`${driverNumber}:UpdateDriverLaps: driver not found`);
    return null;
  }
  if (driver.actualLap.lapNr !== newLap.lapNr) {
    driver.lastLap = driver.actualLap;

    if (
      driver.fastestLap.lapTime > driver.actualLap.lapTime ||
      driver.fastestLap.lapTime === 'no time'
    ) {
      if (driver.actualLap.LapTime !== 'no time') {
        driver.fastestLap = driver.actualLap;
      }
    }
  }
  driver.actualLap = newLap;
};

const updateDriverPits = (driverNumber, pit) => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  if (!driver) return null;
  const pits = driver.pits.find(pit => pit.lapNr === driver.pits.lapNr);
  if (!driver.pits.length || !pits) driver.pits.push(pit);
};

const updateDriverTyre = (driverNumber, tyre) => {
  const driver = drivers.find(driver => driver.number === driverNumber);
  if (!driver) return null;
  driver.tyre = tyre;
};

const deleteDrivers = () => {
  drivers = [];
};

module.exports = {
  addDriver,
  deleteDrivers,
  getDriverData,
  getDriverGapToLeader,
  getDriverLastLap,
  getDriverName,
  getDriverNumbers,
  getDriverPits,
  getDrivers,
  getDriversByPositon,
  getFastestLap,
  updateDriverLaps,
  updateDriverTyre,
  updateDriverPits,
  updateGapToLeader,
  updatePositions
};
