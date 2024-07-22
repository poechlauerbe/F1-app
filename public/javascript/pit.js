function loadSite () {
  fetch('/api/pit')
    .then(response => response.json())
    .then(data => {
      const pitDiv = document.getElementById('pit');
      pitDiv.innerHTML = '';
      data.forEach(pitinfo => {
        const pitElem = document.createElement('p');
        pitElem.innerHTML = `Number: ${pitinfo.driverNumber} | Lap: ${pitinfo.pitStopLap} | Pitstop duration: ${pitinfo.pitStopTime}`;
        pitDiv.appendChild(pitElem);
      });
    })
    .catch(error => {
      console.error('Error fetching pit infos:', error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  loadSite();
  setInterval(loadSite, 10000);
});