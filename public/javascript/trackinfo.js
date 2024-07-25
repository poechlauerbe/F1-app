import { formatTimeShort, formatDate } from './services/service_time.js';
const trackinfoDiv = document.getElementById('trackinfo');

let startTime = '';
let map = null;
let sessionName = '';

function loadSchedule () {
  fetch('/api/schedule')
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].start === startTime) {
          if (map && sessionName !== data[i].name) {
            map.remove();
            map = null;
          }
          if (!map) {
            map = L.map('map').setView([data[i].lat, data[i].lon], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
          }
          sessionName = data[i].name;
          break;
        }
      }
    })
    .catch(error => {
      console.error('Error fetching schedule:', error);
    });
}

function loadSite () {
  fetch('/api/trackinfo')
    .then(response => response.json())
    .then(data => {
      trackinfoDiv.innerHTML = '';
      const locationElement = document.createElement('p');
      locationElement.textContent = `Location: ${data.name} - ${data.country} `;
      trackinfoDiv.appendChild(locationElement);

      const sessionElement = document.createElement('p');
      // ider: concatenate string instead of creating elements
      if (data.sessionName === data.sessionType) {
        sessionElement.textContent = `Session: ${data.sessionName} `;
      } else {
        sessionElement.textContent = `Session: ${data.sessionName} - ${data.sessionType} `;
      }
      trackinfoDiv.appendChild(sessionElement);

      const dateElement = document.createElement('p');
      dateElement.textContent = `Date: ${formatDate(data.start)} \nStart*: ${formatTimeShort(data.start)} \nEnd*: ${formatTimeShort(data.end)}\n * your local time `;
      trackinfoDiv.appendChild(dateElement);
      const weatherHeading = document.createElement('h2');
      weatherHeading.textContent = 'Weather';
      trackinfoDiv.appendChild(weatherHeading);
      const weatherElement = document.createElement('p');
      const pressure = data.weather.pressure / 1000;
      weatherElement.textContent = `date: ${formatDate(data.weather.time)}\ntime: ${formatTimeShort(data.weather.time)}\nAir temperature: ${data.weather.airTemp}°C\nTrack temperature: ${data.weather.trackTemp}°C\nHumidity: ${data.weather.humidity}%\npressure: ${pressure} bar\nWind speed: ${data.weather.windSpeed} m/s\nWind direction: ${data.weather.windDirection}°\nRainfall: ${data.weather.rainfall}\nSession ID: ${data.sessionId}`;
      trackinfoDiv.appendChild(weatherElement);
      startTime = data.isoDate;
      loadSchedule();
    })
    .catch(error => {
      console.error('Error fetching trackinfo:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  // loadScript('https://unpkg.com/leaflet/dist/leaflet.js')
  loadSite();
  setInterval(loadSite, 30000);
});

// ${formatTime(data['weather']['time'])}
