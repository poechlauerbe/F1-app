function Pits (driverNumber, pitStopLap, pitStopTime) {
  this.driverNumber = driverNumber;
  this.pitStopLap = pitStopLap;
  this.pitStopTime = pitStopTime;
}

let pitStops = [];

const addPitStop = (driverNumber, pitStopLap, pitStopTime) => {
  const pit = pitStops.find(elem => elem.pitStopLap === pitStopLap);
  if (!pit) {
    pitStops.push(new Pits(driverNumber, pitStopLap, pitStopTime));
  }
};

const deletePitStops = () => {
  pitStops = [];
};

const getPitStops = () => {
  return pitStops.slice().reverse();
};

module.exports = {
  addPitStop,
  deletePitStops,
  getPitStops
};
