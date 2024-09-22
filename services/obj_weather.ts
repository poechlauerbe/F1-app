function Weather (
  time,
  airTemp,
  trackTemp,
  humidity,
  pressure,
  windSpeed,
  windDirection,
  rainfall
) {
  this.time = time;
  this.airTemp = airTemp;
  this.trackTemp = trackTemp;
  this.humidity = humidity;
  this.pressure = pressure;
  this.windSpeed = windSpeed;
  this.windDirection = windDirection;
  this.rainfall = rainfall;
}

let weather = [];

const addWeather = (
  time,
  airTemp,
  trackTemp,
  humidity,
  pressure,
  windSpeed,
  windDirection,
  rainfall
) => {
  const newWeather = weather.find(newWeather => newWeather.time === time);
  if (!newWeather) {
    weather.push(
      new Weather(
        time,
        airTemp,
        trackTemp,
        humidity,
        pressure,
        windSpeed,
        windDirection,
        rainfall
      )
    );
  }
};

const getLastWeather = () => {
  if (weather.length > 0) return weather[weather.length - 1];
  return null;
};

const deleteWeather = () => {
  weather = [];
};

module.exports = {
  addWeather,
  deleteWeather,
  getLastWeather
};
