function CarData(number, date, brake, drs, meeting_key, n_gear, rpm, session_key, speed, throttle) {
	this.number = number || 0	;
	this.date = date || '';
	this.brake = brake || 0;
	this.drs = drs || 0;
	this.meeting_key = meeting_key || 0;
	this.n_gear = n_gear || 0;
	this.rpm = rpm || 0;
	this.session_key = session_key || 0;
	this.speed = speed || 0;
	this.throttle = throttle || 0;
}

let cardata = [];

const getCarData = (driverNumber) => {
	const driver = cardata.find(driver => driver.number === driverNumber);
	return driver;
}

const updateCarData = (number, date, brake, drs, meeting_key, n_gear, rpm, session_key, speed, throttle)  => {
	const driver = cardata.find(driver => driver.date === date);
	if (!driver) {
		cardata.push(new CarData(number, date, brake, drs, meeting_key, n_gear, rpm, session_key, speed, throttle));
	}
}

module.exports = { getCarData, updateCarData };
