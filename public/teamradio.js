document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/teamradio')
        .then(response => response.json())
        .then(data => {
            const teamradioDiv = document.getElementById('teamradio');
            data.reverse().forEach(teamradio => {
				const teamradioheadline = document.createElement('p');
				teamradioheadline.textContent = teamradio['date'] + '	' + teamradio['driver_number'] + '\n';
                const teamradioElement = document.createElement('audio');
				teamradioElement.src = teamradio['recording_url'];
				teamradioElement.controls = true;
                teamradioDiv.appendChild(teamradioheadline);
				teamradioDiv.appendChild(teamradioElement);

            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
