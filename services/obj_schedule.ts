class RaceScheduleObj {
  _name : string;
  _category : string;
  _start : string;
  _end : string;
  _location : string;
  _lat : Number;
  _lon : Number;

  constructor (
    name : string,
    category : string,
    start : string, // to change
    end : string, // to change
    location : string,
    lat : Number,
    lon : Number
  ) {
    this._name = name;
    this._category = category;
    this._start = start;
    this._end = end;
    this._location = location;
    this._lat = lat;
    this._lon = lon;
  }
}

const schedule : RaceScheduleObj[] = [];

const getSchedule = () => {
  return schedule;
};

const addSchedule = (name : string, category : string, start : string, end : string, location : string, lat : Number, lon : Number) => {
  // add check if already existing
  schedule.push(
    new RaceScheduleObj(name, category, start, end, location, lat, lon)
  );
};

export {
  addSchedule,
  getSchedule
};
