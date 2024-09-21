function Tyres (tyreAgeAtStart, stintNr, lapStart, lapEnd, compound) {
  this.tyreAgeAtStart = tyreAgeAtStart;
  this.stintNr = stintNr;
  this.lapStart = lapStart;
  this.lapEnd = lapEnd;
  this.compound = compound;
  this.lapCount = this.lapEnd - this.lapStart + lapStart;
}

let tyres = [];

const addTyre = (
  driverNumber,
  tyreAgeAtStart,
  stintNr,
  lapStart,
  lapEnd,
  compound
) => {
  if (!tyres[driverNumber]) {
    tyres[driverNumber] = [];
  }
  const driverTyres = tyres[driverNumber].find(t => t.stintNr === stintNr);
  if (driverTyres) {
    if ((driverTyres.compound === '' || driverTyres.compound === 'UNKNOWN') && compound !== '') {
      driverTyres.tyreAgeAtStart = tyreAgeAtStart;
      driverTyres.stintNr = stintNr;
      driverTyres.lapStart = lapStart;
      driverTyres.lapEnd = lapEnd;
      driverTyres.compound = compound;
    } else if (driverTyres.lapStart === lapStart && driverTyres.lapEnd !== lapEnd) {
      driverTyres.lapEnd = lapEnd;
      driverTyres.compound = compound;
    }
  } else {
    tyres[driverNumber].push(
      new Tyres(tyreAgeAtStart, stintNr, lapStart, lapEnd, compound)
    );
  }
};

const deleteTyres = () => {
  tyres = [];
};

const getActualTyre = (driverNumber) => {
  let tyreArray = [];
  tyreArray = getTyres(driverNumber);
  if (tyreArray && tyreArray.length()) {
    return tyreArray[tyreArray.length() - 1];
  }
  return null;
};

const getTyres = (driverNumber) => {
  if (!tyres[driverNumber]) {
    return null;
  }
  return tyres[driverNumber];
};

module.exports = {
  addTyre,
  deleteTyres,
  getActualTyre,
  getTyres
};
