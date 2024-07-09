function Driver(number, name, photo_url, country, team, team_color, position, lapCount, gapToLeader, lastLap, fastestLap, tyre) {
	this.number = number;
	this.name = name || '';
	this.photo_url = photo_url || '';
	this.country = country || '';
	this.team = team || '';
	this.team_color = team_color || '';
	this.position = position || 0;
	this.lapCount = lapCount || 0;
	this.gapToLeader = gapToLeader || '';
	this.actualLap = {driverNumber: number, timeS1: 'no time', timeS2: 'no time', timeS3: 'no time', lapNr: '', lapTime: 'no time'};
	this.lastLap = lastLap || {driverNumber: number, timeS1: 'no time', timeS2: 'no time', timeS3: 'no time', lapNr: '', lapTime: 'no time'};;
	this.fastestLap = fastestLap || {driverNumber: number, timeS1: 'no time', timeS2: 'no time', timeS3: 'no time', lapNr: '', lapTime: 'no time'};;
	this.laps = [];
	this.tyre = tyre || '';
	this.pits = [];
// check update depending on session key
}

let drivers = [];

const getDriverPits = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.pits;
}

const getDrivers = () => {
	return drivers;
}

const getDriversByPositon = () => {
	let driversSorted = [];
	for (i = 1; i < drivers.length; i++) {
		const driver = drivers.find(driver => driver.position === i);
		driversSorted.push(driver);
	}
	return driversSorted;
}

const getDriverName = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.name;
}

const getDriverLastLap = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.lastLap;
}


const getFastestLap = (driverNumber) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	return driver.lastLap;
}


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
	if (!driver)
	{
		console.log(driverNumber);
		console.log("updateGapToLeader: driver not found")
		return null;
	}
	driver.gapToLeader = newGap;
}

const updateDriverLaps = (driverNumber, newLap) => {
	if (!driverNumber || !newLap)
		return null;
	const driver = drivers.find(driver => driver.number === driverNumber);
	if (!driver)
	{
		console.log("UpdateDriverLaps: driver not found")
		return null;
	}
	if (driver.actualLap.lapNr != newLap.lapNr)
	{
		driver.lastLap = driver.actualLap;

		if (driver.actualLap.lapNr == 2)
			driver.fastestLap = newLap;
		else if (driver.fastestLap.lapTime > driver.actualLap.lapTime || driver.fastestLap.lapTime === 'no time')
		{
			if (driver.actualLap.LapTime != 'no time')
				driver.fastestLap = driver.actualLap;
		}

	}
	driver.actualLap = newLap;
}

const updateDriverPits = (driverNumber, pit) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	if (!driver)
		return null;
	const pits = driver.pits.find(pit => pit.lapNr === driver.pits.lapNr);
	if (!driver.pits.length || !pits)
		driver.pits.push(pit);
}

const updateDriverTyre = (driverNumber, tyre) => {
	const driver = drivers.find(driver => driver.number === driverNumber);
	if (!driver)
		return null;
	driver.tyre = tyre;
}

module.exports = {
	getDrivers,
	getDriversByPositon,
	getDriverName,
	getDriverLastLap,
	getFastestLap,
	getDriverGapToLeader,
	addDriver,
	updatePositions,
	updateGapToLeader,
	updateDriverLaps,
	updateDriverTyre
};
