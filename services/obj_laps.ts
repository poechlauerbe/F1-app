// const { getDriverName } = require('./obj_drivers');

function Lap (driverNumber, timeS1, timeS2, timeS3, lapNr, lapTime, tyre) {
  this.driverNumber = driverNumber;
  this.timeS1 = timeS1 || 'no time';
  this.timeS2 = timeS2 || 'no time';
  this.timeS3 = timeS3 || 'no time';
  this.lapNr = lapNr || 0;
  this.lapTime = lapTime || 'no time';
  this.tyre = tyre || '';
}

let laps = [];

const getLaps = () => {
  return laps;
};

const deleteLaps = () => {
  laps = [];
};

const getLastLap = driverNumber => {
  const lapArray = laps.filter(laps => laps.driverNumber === driverNumber);
  if (lapArray.length === 0) return null;
  return lapArray[lapArray.length - 1];
};

const getPreLastLap = driverNumber => {
  const lapArray = laps.filter(laps => laps.driverNumber === driverNumber);
  if (lapArray.length < 2) {
    console.log('PreLastLap not working');
    return null;
  }
  return lapArray[lapArray.length - 2];
};

const addLap = (driverNumber, timeS1, timeS2, timeS3, lapNr, lapTime, tyre) => {
  const laparr = laps.filter(laps => laps.driverNumber === driverNumber);
  const lap = laparr.find(laps => laps.lapNr === lapNr);
  if (!lap) {
    laps.push(new Lap(driverNumber, timeS1, timeS2, timeS3, lapNr, lapTime, tyre));
  }
};

module.exports = {
  addLap,
  deleteLaps,
  getLaps,
  getLastLap,
  getPreLastLap
};
