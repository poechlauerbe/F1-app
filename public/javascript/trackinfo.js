// import { formatTime } from './services/service_time.js';
const trackinfoDiv = document.getElementById('trackinfo');

let startTime = '';

function loadSchedule () {
  fetch('/api/schedule')
    .then(response => response.json())
    .then(data => {
      data.forEach(event => {
        if (event.start === startTime) {
          const sessionElement = document.createElement('p');
          sessionElement.textContent = `Test - combining data: ${event.name} - ${event.location} - ${event.category} - ${event.start}`;
          trackinfoDiv.appendChild(sessionElement);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching schedule:', error);
    });
}

function loadSite() {
  fetch('/api/trackinfo')
    .then(response => response.json())
    .then(data => {
      trackinfoDiv.innerHTML = '';
      const locationElement = document.createElement('p');
      locationElement.textContent = `Location: ${data['name']} - ${data['country']} `;
      trackinfoDiv.appendChild(locationElement);

      const sessionElement = document.createElement('p');
      // ider: concatenate string instead of creating elements
      if (data['sessionName'] === data['sessionType'])
        sessionElement.textContent = `Session: ${data['sessionName']} `;
      else
        sessionElement.textContent = `Session: ${data['sessionName']} - ${data['sessionType']} `;
      trackinfoDiv.appendChild(sessionElement);

      const dateElement = document.createElement('p');
      dateElement.textContent = `Date: ${data['date']} \nStart*: ${data['start']} \nEnd*: ${data['end']}\n * your local time `;
      trackinfoDiv.appendChild(dateElement);
      const weatherHeading = document.createElement('h2');
      weatherHeading.textContent = 'Weather';
      trackinfoDiv.appendChild(weatherHeading);
      const weatherElement = document.createElement('p');
      let pressure = data['weather']['pressure'] / 1000;
      weatherElement.textContent = `date/time: ${data['weather']['time']} \nAir temperature: ${data['weather']['airTemp']}°C\nTrack temperature: ${data['weather']['trackTemp']}°C\nHumidity: ${data['weather']['humidity']}%\npressure: ${pressure} bar\nWind speed: ${data['weather']['windSpeed']} m/s\nWind direction: ${data['weather']['windDirection']}°\nRainfall: ${data['weather']['rainfall']}\nSession ID: ${data['sessionId']}`;
      trackinfoDiv.appendChild(weatherElement);
      startTime = data['isoDate'];
      loadSchedule();
    })
    .catch(error => {
      console.error('Error fetching trackinfo:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadSite();
  setInterval(loadSite, 30000);
});

// ${formatTime(data['weather']['time'])}
