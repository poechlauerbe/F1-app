// const { getDriverName } = require('./obj_drivers');

function Lap(driverNumber, timeS1, timeS2, timeS3, lapNr) {
	this.driverNumber = driverNumber;
	this.timeS1 = timeS1 || 'no time';
	this.timeS2 = timeS2 || 'no time';
	this.timeS3 = timeS3 || 'no time';
	this.lapNr = lapNr || 0;
}

let laps = [];

const getLaps = () => {
	return laps;
}

const getLastLap = (driverNumber) => {
	const lapArray = laps.filter(laps => laps.driverNumber == driverNumber);
	if (lapArray.length === 0)
		return null;
	return lapArray[lapArray.length - 1];
}

// const getLapNumber = (driverNumber, lapNr) => {
// 	const lapArray = laps;
// 	// if (lapArray.length === 0 || lapNr > lapArray.length - 1)
// 	// 	return null;
// 	return lapArray;
// }

const addLap = (driverNumber, timeS1, timeS2, timeS3, lapNr) => {
	let laparr = laps.filter(laps => (laps.driverNumber === driverNumber));
	const lap = laparr.find(laps => laps.lapNr === lapNr)
	if (!lap)
		laps.push(new Lap(driverNumber, timeS1, timeS2, timeS3, lapNr));
}

module.exports = {
	addLap,
	getLaps,
	getLastLap,
	// getLapNumber
}