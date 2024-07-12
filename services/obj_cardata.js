function CarData(number, date, brake, drs, meeting_key, n_gear, rpm, session_key, speed, throttle) {
	this.number = number;
	this.date = date;
	this.brake = brake;
	this.drs = drs;
	this.meeting_key = meeting_key;
	this.n_gear = n_gear;
	this.rpm = rpm;
	this.session_key = session_key;
	this.speed = speed;
	this.throttle = throttle;
}

let cardata = [];

const getCarData = (driverNumber) => {
	const driver = cardata.find(driver => driver.number === driverNumber);
	return driver;
}

const updateCarData = (newCarData) => {
	const index = cardata.findIndex(driver => driver.number === newCarData.number);
	if (index === -1) {
		cardata.push(newCarData);
	} else {
		cardata[index] = newCarData;
	}
}
