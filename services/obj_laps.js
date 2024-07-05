const { getDriverName } = require('./obj_drivers');

function Lap(driverNumber, timeS1, timeS2, timeS3, lapNr) {
	this.driverNumber = driverNumber;
	this.timeS1 = timeS1 || 'no time';
	this.timeS2 = timeS2 || 'no time';
	this.timeS3 = timeS3 || 'no time';
	this.lapNr = lapNr || 0;
}

let laps = [];

const addLap = (driverNumber, timeS1, timeS2, timeS3, lapNr) => {
	const lap = laps.find(laps => laps.driverNumber === driverNumber && laps.lapNr);
	if (!lap)
		laps.push(new Lap(driverNumber, timeS1, timeS2, timeS3, lapNr));
}

module.exports = {
	addLap
}