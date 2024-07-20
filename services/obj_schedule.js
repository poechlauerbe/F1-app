function RaceScheduleObj (name, category, start, end, location, lat, lon) {
  this.name = name || '';
  this.category = category || '';
  this.start = start || '';
  this.end = end || '';
  this.location = location || '';
  this.lat = lat || '';
  this.lon = lon || '';
}

const schedule = [];

const getSchedule = () => {
  return schedule;
};

const addSchedule = (name, category, start, end, location, lat, lon) => {
  // add check if already existing
  schedule.push(
    new RaceScheduleObj(name, category, start, end, location, lat, lon)
  );
};

module.exports = {
  addSchedule,
  getSchedule
};
