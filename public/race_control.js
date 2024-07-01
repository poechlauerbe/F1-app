document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/race_control')
        .then(response => response.json())
        .then(data => {
            const raceControlDiv = document.getElementById('raceControl');
            data.reverse().forEach(raceControl => {
                const raceControlElement = document.createElement('p');
				if (raceControl['driver_number'] == null)
					raceControlElement.textContent = raceControl['date'] + '	' + raceControl['message'];
				else
	                raceControlElement.textContent = `Driver number: ${raceControl['driver_number']}, ${raceControl['message']}`;
                raceControlDiv.appendChild(raceControlElement);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
