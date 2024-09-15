import { options2 } from './services/mod_options.js';
import { formatDate } from './services/service_time.js';

let firstItem = '';

const scrollDown = () => {
  const next = document.getElementById('next');
  if (next) {
    next.scrollIntoView({ behavior: 'smooth' });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/schedule')
    .then(response => response.json())
    .then(data => {
      const gpListBaseDiv = document.getElementById('racedates');
      let nextEventFlag = 0;
      gpListBaseDiv.innerHTML = '';
      const gpListDiv = document.createElement('ul');
      gpListBaseDiv.appendChild(gpListDiv);

      data.forEach(event => {
          if (firstItem !== event.location) {
            firstItem = event.location;
            let sunday = new Date(event.start);
            sunday.setDate(sunday.getDate() + 2);
            sunday.setHours(23, 59, 0);
            const headerElem = document.createElement('h2');
            if (new Date().getTime() > new Date(event.start).getTime() && new Date().getTime() < sunday.getTime()) {
              headerElem.className = 'background-this-weekend';
              headerElem.id = 'next';
            }
            else if (new Date().getTime() < sunday.getTime() && nextEventFlag === 0) {
              nextEventFlag = 1;
              headerElem.className = 'background-next-weekend';
              headerElem.id = 'next';
            }

            headerElem.innerHTML = event.location + ' - ' + formatDate(event.start) + ' - ' + formatDate(sunday);
            gpListDiv.appendChild(headerElem);
          }
          const pitElem = document.createElement('li');
          const date = new Date(event.start);
          const timeString = date.toLocaleTimeString([], options2);

          pitElem.innerHTML = `${timeString}: ${event.name} - ${event.location} - ${event.category}`;
          pitElem.className = 'line-height-2';
          gpListDiv.appendChild(pitElem);
      });
    scrollDown();
    })
    .catch(error => {
      console.error('Error fetching pit infos:', error);
    });
});
