function CarData (
  number,
  date,
  brake,
  drs,
  meetingKey,
  gear,
  rpm,
  sessionKey,
  speed,
  throttle
) {
  this.number = number || 0;
  this.date = date || '';
  this.brake = brake || 0;
  this.drs = drs || 0;
  this.meetingKey = meetingKey || 0;
  this.gear = gear || 0;
  this.rpm = rpm || 0;
  this.sessionKey = sessionKey || 0;
  this.speed = speed || 0;
  this.throttle = throttle || 0;
}

let cardata = {};

const getCarData = driverNumber => {
  // const driver = cardata.find(driver => driver.number === driverNumber);
  // return driver;
  return cardata[driverNumber].slice().reverse();
};

const getLast100CarData = driverNumber => {
  if (!cardata[driverNumber]) return;
  const data = cardata[driverNumber].slice().reverse();
  const last100 = [];
  for (let i = 0; i < 100; i++) {
    if (!data[i]) break;
    last100.push(data[i]);
  }
  return last100;
};

const getLastCarDataTime = driverNumber => {
  if (!cardata[driverNumber]) return;
  const data = cardata[driverNumber].slice().reverse();
  return data[0].date;
}

const updateCarData = (
  number,
  date,
  brake,
  drs,
  meetingKey,
  gear,
  rpm,
  sessionKey,
  speed,
  throttle
) => {
  if (!cardata[number]) {
    cardata[number] = [];
  }
  const driver = cardata[number].find(driver => driver.date === date);
  if (!driver) {
    cardata[number].push(
      new CarData(
        number,
        date,
        brake,
        drs,
        meetingKey,
        gear,
        rpm,
        sessionKey,
        speed,
        throttle
      )
    );
  }
};

const deleteCarData = () => {
  cardata = [];
};

module.exports = {
  deleteCarData,
  getCarData,
  getLast100CarData,
  getLastCarDataTime,
  updateCarData
};
