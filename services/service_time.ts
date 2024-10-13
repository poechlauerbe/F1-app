function getTimeNowIsoString () {
  const date = new Date();
  return date.toISOString();
}

export default getTimeNowIsoString;
