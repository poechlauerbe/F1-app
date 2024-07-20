function Racecontrol(
  category,
  date,
  driverNumber,
  flag,
  lapNr,
  message,
  scope,
  sector
) {
  this.category = category || '';
  this.date = date || '';
  this.driverNumber = driverNumber || '';
  this.flag = flag || '';
  this.lapNr = lapNr || '';
  this.message = message || '';
  this.scope = scope || '';
  this.sector = sector || '';
}

let racecontrol = [];

const getRacecontrol = () => {
  return racecontrol;
};

const addRacecontrol = (
  category,
  date,
  driverNumber,
  flag,
  lapNr,
  message,
  scope,
  sector
) => {
  const newRacecontrol = racecontrol.find(
    newRacecontrol =>
      newRacecontrol.date === date && newRacecontrol.message === message
  );
  if (!newRacecontrol)
    racecontrol.push(
      new Racecontrol(
        category,
        date,
        driverNumber,
        flag,
        lapNr,
        message,
        scope,
        sector
      )
    );
};

const deleteRacecontrol = () => {
  racecontrol = [];
};

module.exports = {
  addRacecontrol,
  deleteRacecontrol,
  getRacecontrol,
};
