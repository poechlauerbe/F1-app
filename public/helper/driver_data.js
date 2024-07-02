export function Driver(number, position, photo, name, team, laps, status) {
	this.number = number;
	this.position = position;
	this.photo = photo;
	this.name = name;
	this.team = team;
	this.laps = laps;
	// this.time = time;
	this.status = status;
}

export let drivers = [];

export function fetchDrivers() {
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
}
