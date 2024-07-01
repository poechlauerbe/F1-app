document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/race_control')
        .then(response => response.json())
        .then(data => {
            const raceControlDiv = document.getElementById('raceControl');
            data.reverse().forEach(raceControl => {
                const raceControlElement = document.createElement('p');
                const date = new Date(raceControl['date']);
                const options = {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                };
                const timeString = date.toLocaleTimeString([], options);
				if (raceControl['driver_number'] == null)
					raceControlElement.textContent = timeString + '	' + raceControl['message'];
				else
	                raceControlElement.textContent = timeString + ` Driver number: ${raceControl['driver_number']}, ${raceControl['message']}`;
                raceControlDiv.appendChild(raceControlElement);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
