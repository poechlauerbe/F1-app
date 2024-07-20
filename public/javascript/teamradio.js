import { options } from './services/mod_options.js';

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/teamradio')
    .then(response => response.json())
    .then(data => {
      const teamradioDiv = document.getElementById('teamradio');
      const info = document.createElement('p');

      info.textContent =
        'These audio files are about 1 min behind the live event.\n';
      teamradioDiv.appendChild(info);

      data.forEach(teamradio => {
        const teamradioheadline = document.createElement('p');
        const date = new Date(teamradio.date);
        const timeString = date.toLocaleTimeString([], options);

        teamradioheadline.textContent =
          timeString +
          ' ' +
          teamradio.driverName +
          ' - ' +
          teamradio.driverNumber +
          '\n';
        const teamradioElement = document.createElement('audio');
        teamradioElement.src = teamradio.recUrl;
        teamradioElement.controls = true;

        teamradioDiv.appendChild(teamradioheadline);
        teamradioDiv.appendChild(teamradioElement);

        // teamradioElement.addEventListener('loadedmetadata', function() {
        // });
      });
    })
    .catch(error => {
      console.error('Error fetching drivers:', error);
    });
});
