function Driver(number, name, photo_url, country, team, team_color, position, laps, gapToLeader) {
	this.number = number;
	this.name = name || '';
	this.photo_url = photo_url || '';
	this.country = country || '';
	this.team = team || '';
	this.team_color = team_color || '';
	this.position = position || 0;
	this.laps = laps || 0;
	this.gapToLeader = gapToLeader || '';
// check update depending on session key
}


let drivers = [];

const getDrivers = () => {
	return drivers;
}

const getDriverName = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.name;
}

// const getDriverTeam = (driverNumber) => {
// 	const driver = drivers.find(driver => driver.number === driverNumber);
// 	return driver.team;
// }

// const getDriverPhoto = (driverNumber) => {
// 	const driver = drivers.find(driver => driver.number === driverNumber);
// 	return driver.photo;
// }

// const getDriverPosition = (driverNumber) => {
// 	const driver = drivers.find(driver => driver.number === driverNumber);
// 	return driver.position;
// }

// const getDriverLaps = (driverNumber) => {
// 	const driver = drivers.find(driver => driver.number === driverNumber);
// 	return driver.laps;
// }

const getDriverGapToLeader = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.gapToLeader;
}

const addDriver = (driverNumber, driverName, driverCountry, team, teamColor, photoUrl) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	if (!driver) {
		drivers.push(new Driver(driverNumber, driverName, photoUrl, driverCountry, team, teamColor));
	}
}

const updatePositions = (driverNumber, position) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	driver.position = position;
}

const updateGapToLeader = (driverNumber, newGap) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	driver.gapToLeader = newGap;
}

module.exports = {
	getDrivers,
	getDriverName,
	// getDriverTeam,
	// getDriverPhoto,
	// getDriverPosition,
	// getDriverLaps,
	getDriverGapToLeader,
	addDriver,
	updatePositions,
	updateGapToLeader,
	Driver,
	drivers
};
