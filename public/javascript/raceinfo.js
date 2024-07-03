document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/sessions')
        .then(response => response.json())
        .then(data => {
            const raceinfoDiv = document.getElementById('raceinfo');

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
			dateElement.textContent = `Start: ${data[0]['date_start']} \n\n End: ${data[0]['date_end']} `;
			raceinfoDiv.appendChild(dateElement);
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
