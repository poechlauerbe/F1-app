function GpList(meetingId, location, officialName, dateFrom, gmtOffset) {
	this.meetingId = meetingId;
	this.location = location;
	this.officialName = officialName;
	this.dateFrom = dateFrom;
	this.gmtOffset = gmtOffset;
}

gpList = [];

getGpList = () => {
	return gpList;
}

addGpList = (meetingId, location, officialName, dateFrom, gmtOffset) => {
	meeting = gpList.find(gp => gp.meetingId === meetingId);
	if (!meeting)
		gpList.push(new GpList(meetingId, location, officialName, dateFrom, gmtOffset));
}
