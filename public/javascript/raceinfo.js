const raceinfoDiv = document.getElementById('raceinfo');

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/sessions')
        .then(response => response.json())
        .then(data => {

			const locationElement = document.createElement('p');
			locationElement.textContent = `Location: ${data[0]['location']} - ${data[0]['country_name']} `;
			raceinfoDiv.appendChild(locationElement);

			const sessionElement = document.createElement('p');
			if (data[0]['session_name'] === data[0]['session_type'])
				sessionElement.textContent = `Session: ${data[0]['session_name']} `;
			else
				sessionElement.textContent = `Session: ${data[0]['session_name']} - ${data[0]['session_type']} `;
			raceinfoDiv.appendChild(sessionElement);
			const dateElement = document.createElement('p');
			dateElement.textContent = `Start: ${data[0]['date_start']} \nEnd: ${data[0]['date_end']} `;
			raceinfoDiv.appendChild(dateElement);
			return fetch('/api/weather')
        })
        // .catch(error => {
        //     console.error('Error fetching drivers:', error);
        // });
        .then(response => response.json())
        .then(data => {
            // const raceinfoDiv = document.getElementById('raceinfo');

			const weatherHeading = document.createElement('h2');
			weatherHeading.textContent = 'Weather';
			raceinfoDiv.appendChild(weatherHeading);
			last = data.length - 1;
			const weatherElement = document.createElement('p');
			let pressure = data[last]['pressure'] / 1000;
			weatherElement.textContent = `date/time: ${data[last]['date']} \nAir temperature: ${data[last]['air_temperature']}°C\nHumidity: ${data[last]['humidity']}%\npressure: ${pressure} bar\nWind speed: ${data[last]['wind_speed']} m/s\nWind direction: ${data[last]['wind_direction']}°\nRainfall: ${data[last]['rainfall']}`;
			raceinfoDiv.appendChild(weatherElement);
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});

// document.addEventListener('DOMContentLoaded', () => {

// });
