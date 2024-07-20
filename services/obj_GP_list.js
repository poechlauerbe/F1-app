function GpListElem(
  meetingId,
  name,
  officialName,
  country,
  dateStart,
  gmtOffset
) {
  this.meetingId = meetingId || 0;
  this.name = name || '';
  this.officialName = officialName || '';
  this.country = country || '';
  this.dateStart = dateStart || '';
  this.gmtOffset = gmtOffset || 0;
}

gpList = [];

const getGpList = () => {
  return gpList;
};

const addGpList = (
  meetingId,
  name,
  officialName,
  country,
  dateStart,
  gmtOffset
) => {
  meeting = gpList.find(gp => gp.meetingId === meetingId);
  if (!meeting)
    gpList.push(
      new GpListElem(
        meetingId,
        name,
        officialName,
        country,
        dateStart,
        gmtOffset
      )
    );
};

module.exports = {
  getGpList,
  addGpList,
};
