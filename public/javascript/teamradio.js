

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/teamradio')
        .then(response => response.json())
        .then(data => {
            const teamradioDiv = document.getElementById('teamradio');
            data.forEach(teamradio => {
				const teamradioheadline = document.createElement('p');
				const date = new Date(teamradio['date']);

                // Extract the time part and format it
                const options = {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                };
                const timeString = date.toLocaleTimeString([], options);
				teamradioheadline.textContent = timeString + '	' + teamradio['driverName'] + " - " + teamradio['driverNumber'] + '\n';
                const teamradioElement = document.createElement('audio');
				teamradioElement.src = teamradio['recUrl'];
				teamradioElement.controls = true;
                teamradioDiv.appendChild(teamradioheadline);
				teamradioDiv.appendChild(teamradioElement);

            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
