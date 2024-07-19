function CarData(number, date, brake, drs, meeting_key, gear, rpm, session_key, speed, throttle) {
	this.number = number || 0	;
	this.date = date || '';
	this.brake = brake || 0;
	this.drs = drs || 0;
	this.meeting_key = meeting_key || 0;
	this.gear = gear || 0;
	this.rpm = rpm || 0;
	this.session_key = session_key || 0;
	this.speed = speed || 0;
	this.throttle = throttle || 0;
}

let cardata = {};

const getCarData = (driverNumber) => {
	// const driver = cardata.find(driver => driver.number === driverNumber);
	// return driver;
	return cardata[driverNumber].slice().reverse();
}

const getLast100CarData = (driverNumber) => {
	if (!cardata[driverNumber])
		return ;
	let data = cardata[driverNumber].slice().reverse();
	let last100 = [];
	for (i = 0; i < 100; i++) {
		if (!data[i])
			break;
		last100.push(data[i]);
	}
	return last100;
}

const updateCarData = (number, date, brake, drs, meeting_key, gear, rpm, session_key, speed, throttle)  => {
	if (!cardata[number]) {
		cardata[number] = [];
	}
	const driver = cardata[number].find(driver => driver.date === date);
	if (!driver) {
		cardata[number].push(new CarData(number, date, brake, drs, meeting_key, gear, rpm, session_key, speed, throttle));
	}
}

const deleteCarData = () => {
	cardata = [];
}

module.exports = {
	deleteCarData,
	getCarData,
	getLast100CarData,
	updateCarData
};
