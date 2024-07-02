function Driver(number, position, photo, name, team, laps, status) {
	this.number = number;
	this.position = position;
	this.photo = photo;
	this.name = name;
	this.team = team;
	this.laps = laps;
	// this.time = time;
	this.status = status;
}

let drivers = [];


document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/drivers')
        .then(response => response.json())
        .then(data => {
            data.forEach(driver => {
				drivers.push(new Driver(driver['driver_number'], 0, driver['headshot_url'], driver['full_name'], driver['team_name'], 0, driver['time'], 'active'));
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/teamradio')
        .then(response => response.json())
        .then(data => {
            const teamradioDiv = document.getElementById('teamradio');
            data.reverse().forEach(teamradio => {
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
                let driver;
                drivers.forEach((d) => {
                    if (d.number === teamradio['driver_number']) {
                        driver = d;
                    }
                });
				teamradioheadline.textContent = timeString + '	' + driver.name + " - " + driver.number + '\n';
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
