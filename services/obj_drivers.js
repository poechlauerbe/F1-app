function Driver(number, position, photo, name, team, laps, gapToLeader) {
	this.number = number;
	this.position = position || 0;
	this.photo = photo || '';
	this.name = name || '';
	this.team = team || '';
	this.laps = laps || 0;
	this.gapToLeader = gapToLeader || '';
}

let drivers = [];

const getDrivers = () => {
	return drivers;
}

const getDriverName = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.name;
}

const getDriverTeam = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.team;
}

const getDriverPhoto = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.photo;
}

const getDriverPosition = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.position;
}

const getDriverLaps = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.laps;
}

const getDriverGapToLeader = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.gapToLeader;
}

const addDriver = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	if (!driver) {
		drivers.push(new Driver(driverNumber));
	}
}

module.exports = {
	getDrivers,
	getDriverName,
	getDriverTeam,
	getDriverPhoto,
	getDriverPosition,
	getDriverLaps,
	getDriverGapToLeader,
	addDriver,
	Driver,
	drivers
};
