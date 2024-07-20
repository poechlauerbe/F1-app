const { getLastWeather } = require('./obj_weather');

function Location (
  sessionId,
  sessionName,
  sessionType,
  name,
  country,
  start,
  end,
  isoDate
) {
  this.sessionId = sessionId || 0;
  this.sessionName = sessionName || '';
  this.sessionType = sessionType || '';
  this.name = name || '';
  this.country = country || '';
  this.start = start || '';
  this.end = end || '';
  this.weather = '';
  this.isoDate = isoDate || '';
}

let location = null;

const getLocation = () => {
  if (location.sessionId === 0) return null;
  return location;
};

const setLocation = (
  sessionId,
  sessionName,
  sessionType,
  name,
  country,
  start,
  end
) => {
  if (!location) {
    location = new Location(
      sessionId,
      sessionName,
      sessionType,
      name,
      country,
      start,
      end,
      new Date(start).toISOString()
    );
  } else if (sessionId.length && location.sessionId !== sessionId) {
    location.sessionId = sessionId;
    location.sessionName = sessionName;
    location.sessionType = sessionType;
    location.name = name;
    location.country = country;
    location.start = start;
    location.end = end;
    location.isoDate = new Date(start).toISOString();
  }
};

const updateActualLocationWeather = () => {
  if (getLastWeather) location.weather = getLastWeather();
};

module.exports = {
  getLocation,
  setLocation,
  updateActualLocationWeather
};
