function RaceScheduleObj(name, category, start, end, location, lat, lon) {
	this.name = name || '';
	this.category = category || '';
	this.start = start || '';
	this.end = end || '';
	this.location = location || '';
	this.lat = lat || '';
	this.lon = lon || '';
}

schedule = [];

const getSchedule = () => {
	return schedule;
}

// const addSchedule = (date, time, location, category, description) => {
// 	schedule.push(new RaceScheduleObj(date, time, location, category, description));
// }

const addSchedule = (name, category, start, end, location, lat, lon) => {
	schedule.push(new RaceScheduleObj(name, category, start, end, location, lat, lon));
}

module.exports = {
	getSchedule,
	addSchedule
}
