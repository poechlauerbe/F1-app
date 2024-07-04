function Location(sessionId, sessionName, locationName, locationCountry) {
	this.sessionId = sessionId || 0;
	this.sessionName = sessionName || '';
	this.locationName = locationName || '';
	this.locationCountry = locationCountry || '';
}

let location = null;

const setLocation = (sessionId, sessionName, locationName, locationCountry) => {
	if (!location)
	{
		location = new Location (sessionId, sessionName, locationName, locationCountry);
	}
	else if (location.sessionId !== sessionId)
	{
		location.sessionId = sessionId;
		location.sessionName = sessionName;
		location.locationName = locationName;
		location.locationCountry = locationCountry;
	}
}

const updateLocation = (sessionId, sessionName, locationName, locationCountry) => {
	if (location && location.sessionId !== sessionId)
	{
		location.sessionId = sessionId;
		location.sessionName = sessionName;
		location.locationName = locationName;
		location.locationCountry = locationCountry;
	}
}

module.exports = {
	setLocation,
	updateLocation
}