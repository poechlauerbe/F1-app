function formatDate (date) {
  const newDate = new Date(date);
  const day = String(newDate.getDate());
  const month = String(newDate.getMonth() + 1); // Months are zero-indexed
  const year = newDate.getFullYear();

  return `${day}.${month}.${year}`;
}

function formatTime (date) {
  const newDate = new Date(date);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  return newDate.toLocaleTimeString([], options);
}

function getTimeNowIsoString () {
  const date = new Date();
  return date.toISOString();
}

module.exports = {
  formatDate,
  formatTime,
  getTimeNowIsoString
};
