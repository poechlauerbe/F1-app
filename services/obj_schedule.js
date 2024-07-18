function RaceScheduleObj(name, category, start, end, location) {
	this.name = name || '';
	this.category = category || '';
	this.start = start || '';
	this.end = end || '';
	this.location = location || '';


	// this.date = date || '';
	// this.time = time || '';
	// this.category = category || '';
}

schedule = [];

const getSchedule = () => {
	return schedule;
}

// const addSchedule = (date, time, location, category, description) => {
// 	schedule.push(new RaceScheduleObj(date, time, location, category, description));
// }

const addSchedule = (name, category, start, end, location) => {
	schedule.push(new RaceScheduleObj(name, category, start, end, location));
}

module.exports = {
	getSchedule,
	addSchedule
}
