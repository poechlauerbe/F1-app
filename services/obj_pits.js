function Pits (driverNumber, lap, pitStopTime) {
  this.driverNumber = driverNumber;
  this.lap = lap;
  this.pitStopTime = pitStopTime;
}

let pitStops = [];

const addPitStop = (driverNumber, lap, pitStopTime) => {
  const pit = pitStops.find(elem => elem.lap === lap);
  if (!pit) {
    pitStops.push(new Pits(driverNumber, lap, pitStopTime))
  }
};

const deletePitStops = () => {
  pitStops = [];
}

const getPitStops = () => {
  return pitStops;
};

module.exports = {
  addPitStop,
  deletePitStops,
  getPitStops
};
