function Driver(number, name, photo_url, country, team, team_color, position, laps, gapToLeader, lastLap, fastestLap) {
	this.number = number;
	this.name = name || '';
	this.photo_url = photo_url || '';
	this.country = country || '';
	this.team = team || '';
	this.team_color = team_color || '';
	this.position = position || 0;
	this.laps = laps || 0;
	this.gapToLeader = gapToLeader || '';
	this.lastLap = lastLap || 'no time';
	this.fastestLap = fastestLap || 'no time';
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

const getLastLap = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.lastLap;
}


const getFastestLap = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.lastLap;
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

const updateLaps = (driverNumber, newLap) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	driver.lastLap = newLap;
	// check also for fastest Lap
	if (driver.fastestLap === 'no time')
		driver.fastestLap = newLap; // not correct - have to add check for fastest lap

}

module.exports = {
	getDrivers,
	getDriverName,
	getLastLap,
	getFastestLap,
	getDriverGapToLeader,
	addDriver,
	updatePositions,
	updateGapToLeader,
	updateLaps
};
