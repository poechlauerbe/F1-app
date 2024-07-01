let blueFlag = 0;

function loadSite() {
    fetch('/api/race_control')
        .then(response => response.json())
        .then(data => {
            document.getElementById('raceControl').innerHTML = '';
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
				if (blueFlag % 2)
	                raceControlElement.textContent = timeString + ` ${raceControl['message']}`;
                raceControlDiv.appendChild(raceControlElement);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
}

document.getElementById('blueFlag').addEventListener('click', () => {
    blueFlag++;
    document.getElementById('blueFlag').textContent = blueFlag % 2 ? 'Blue Flag ON' : 'Blue Flag OFF';
    loadSite();
});

document.addEventListener('DOMContentLoaded', () => {
    loadSite();
});
