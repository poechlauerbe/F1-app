function getTimeNowIsoString () {
  const date = new Date();
  return date.toISOString();
}

module.exports = { getTimeNowIsoString };
