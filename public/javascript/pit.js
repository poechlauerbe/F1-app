document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/pit')
    .then(response => response.json())
    .then(data => {
      const pitDiv = document.getElementById('pit');
      pitDiv.innerHTML = '';
      data.forEach(pitinfo => {
        const pitElem = document.createElement('p');
        pitElem.innerHTML = `Number: ${pitinfo.driver_number} | Lap: ${pitinfo.lap_number} | Time: ${pitinfo.pit_duration}`;
        pitDiv.appendChild(pitElem);
      });
    })
    .catch(error => {
      console.error('Error fetching pit infos:', error);
    });
});
