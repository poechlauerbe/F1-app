function Weather(time, airTemp, trackTemp, humidity) {
	this.time = time;
	this.airTemp = airTemp;
	this.trackTemp = trackTemp;
	this.humidity = humidity;
}

let weather = [];

const addWeather = (time, airTemp, trackTemp, humidity) => {
	const newWeather = weather.find(newWeather => newWeather.time === time);
	if (!newWeather)
		weather.push(new Weather(time, airTemp, trackTemp, humidity))
}

const getLastWeather = () => {
	if (weather.length > 0)
		return weather[weather.length -1];
	return null;
}

module.exports = {
	addWeather,
	getLastWeather
}