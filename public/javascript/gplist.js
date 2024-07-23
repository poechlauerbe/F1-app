document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/oldgplist')
    .then(response => response.json())
    .then(data => {
      const gpListBaseDiv = document.getElementById('gplist');
      gpListBaseDiv.innerHTML = '';
      const gpListDiv = document.createElement('ul');
      gpListBaseDiv.appendChild(gpListDiv);
      data.forEach(gpLocation => {
        const pitElem = document.createElement('li');
        pitElem.innerHTML = `${gpLocation.name} - ${gpLocation.country} - ${gpLocation.dateStart} - ${gpLocation.gmtOffset}`;
        pitElem.className = 'line-height-2';
        gpListDiv.appendChild(pitElem);
      });
    })
    .catch(error => {
      console.error('Error fetching pit infos:', error);
    });
});
