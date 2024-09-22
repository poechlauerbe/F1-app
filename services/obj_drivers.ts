class Driver {
  _number: number;
  _name: string;
  _photoUrl: string;
  _country: string;
  _team: string;
  _teamColor: string;
  _position: number;
  _lapCount: number;
  _gapToLeader: string;
  _lastLap: string;
  _fastestLap: string;
  _tyre: string;

  constructor (
    number: number = 0,
    name: string = '',
    photoUrl: string = '',
    country: string = '',
    team: string = '',
    teamColor: string = '',
    position: number = 0,
    lapCount: number = 0,
    gapToLeader: string = '',
    lastLap: string = '',
    fastestLap: string = '',
    tyre: string = ''
  ) {
    this._number = number;
    this._name = name;
    this._photoUrl = photoUrl;
    this._country = country;
    this._team = team;
    this._teamColor = teamColor;
    this._position = position;
    this._lapCount = lapCount;
    this._gapToLeader = gapToLeader;
    this._lastLap = lastLap;
    this._fastestLap = fastestLap;
    this._tyre =tyre;
  }
}
//  {
//   this.actualLap = {
//     driverNumber: number,
//     timeS1: 'no time',
//     timeS2: 'no time',
//     timeS3: 'no time',
//     lapNr: '',
//     lapTime: 'no time',
//     tyre: ''
//   };
//   this.lastLap = lastLap || {
//     driverNumber: number,
//     timeS1: 'no time',
//     timeS2: 'no time',
//     timeS3: 'no time',
//     lapNr: '',
//     lapTime: 'no time',
//     tyre: ''
//   };
//   this.fastestLap = fastestLap || {
//     driverNumber: number,
//     timeS1: 'no time',
//     timeS2: 'no time',
//     timeS3: 'no time',
//     lapNr: '',
//     lapTime: 'no time',
//     tyre: ''
//   };
//   this.laps = [];
//   this.pits = [];
//   // check update depending on session key
// }

const drivers: Driver[] = [];

// const getDriverPits = driverNumber => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   return driver.pits;
// };

// const getDrivers = () => {
//   return drivers;
// };

// const getDriverData = (driverNumber) => {
//   // console.log(driverNumber);
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   if (driver) {
//     return driver;
//   }
//   return null;
// };

// const getDriverNumbers = () => {
//   const driverNumbers = [];
//   drivers.forEach(element => {
//     driverNumbers.push(element.number);
//   });
//   return driverNumbers;
// };

// const getDriversByPositon = () => {
//   const driversSorted = [];
//   for (let i = 1; i <= drivers.length; i++) {
//     const driver = drivers.find(driver => driver.position === i);
//     driversSorted.push(driver);
//   }
//   return driversSorted;
// };

// const getDriverName = driverNumber => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   return driver.name;
// };

// const getDriverLastLap = driverNumber => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   return driver.lastLap;
// };

// const getFastestLap = driverNumber => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   return driver.lastLap;
// };

// const getDriverGapToLeader = driverNumber => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   return driver.gapToLeader;
// };

const addDriver = (
  driverNumber: number,
  driverName: string,
  driverCountry: string,
  team: string,
  teamColor: string,
  photoUrl: string
) : void => {
  const driverExists = drivers.some(driver => driver._number === driverNumber);
  if (!driverExists) {
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

// const updatePositions = (driverNumber, position) => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   driver.position = position;
// };

// const updateGapToLeader = (driverNumber, newGap) => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   if (!driver) {
//     console.error();
//     console.error(`${driverNumber}: updateGapToLeader: driver not found`);
//     return null;
//   }
//   driver.gapToLeader = newGap;
// };

// const updateDriverLaps = (driverNumber, newLap) => {
//   if (!driverNumber || !newLap) return null;
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   if (!driver) {
//     console.error(`${driverNumber}:UpdateDriverLaps: driver not found`);
//     return null;
//   }
//   if (driver.actualLap.lapNr !== newLap.lapNr) {
//     driver.lastLap = driver.actualLap;

//     if (
//       driver.fastestLap.lapTime > driver.actualLap.lapTime ||
//       driver.fastestLap.lapTime === 'no time'
//     ) {
//       if (driver.actualLap.LapTime !== 'no time') {
//         driver.fastestLap = driver.actualLap;
//       }
//     }
//   }
//   driver.actualLap = newLap;
// };

// const updateDriverPits = (driverNumber, pit) => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   if (!driver) return null;
//   const pits = driver.pits.find(pit => pit.lapNr === driver.pits.lapNr);
//   if (!driver.pits.length || !pits) driver.pits.push(pit);
// };

// const updateDriverTyre = (driverNumber, tyre) => {
//   const driver = drivers.find(driver => driver.number === driverNumber);
//   if (!driver) return null;
//   driver.tyre = tyre;
// };

// const deleteDrivers = () => {
//   drivers = [];
// };

export { addDriver
  // deleteDrivers,
  // getDriverData,
  // getDriverGapToLeader,
  // getDriverLastLap,
  // getDriverName,
  // getDriverNumbers,
  // getDriverPits,
  // getDrivers,
  // getDriversByPositon,
  // getFastestLap,
  // updateDriverLaps,
  // updateDriverTyre,
  // updateDriverPits,
  // updateGapToLeader,
  // updatePositions
};
