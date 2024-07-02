// import { drivers, fetchDrivers } from './helper/driver_data.js';


function Driver(number, position, photo, name, team, laps, gapToLeader) {
	this.number = number;
	this.position = position;
	this.photo = photo;
	this.name = name;
	this.team = team;
	this.laps = laps;
	// this.time = time;
	this.gapToLeader = gapToLeader;
}

let drivers = [];


document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/drivers')
        .then(response => response.json())
        .then(data => {
            data.forEach(driver => {
				drivers.push(new Driver(driver['driver_number'], 0, driver['headshot_url'], driver['full_name'], driver['team_name'], 0, driver['time']));
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});


// fetchDrivers();
// console.log(drivers);

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/positions')
        .then(response => response.json())
        .then(data => {
			data.forEach(positions => {
				drivers.forEach(driver => {
					if (driver.number === positions['driver_number']) {
						driver.position = positions['position'];
						// driver.laps = positions['laps'];
						// driver.time = positions['time'];
						// driver.status = positions['status'];
					}
				});
			});
			// let driver;
			// drivers.sort((a, b) => a.position - b.position);
			// for (let i = 0; i < drivers.length; i++) {
			// 	driver = drivers[i];
			// 	const positionsDiv = document.getElementById('positions');
			// 	const positionsElement = document.createElement('p');
			// 	const positionsImg = document.createElement('img');
			// 	positionsElement.textContent = (i + 1) +  `. ${driver.name} - ${driver.team}`;
			// 	positionsImg.src = driver.photo;
			// 	positionsDiv.appendChild(positionsElement);
			// 	positionsDiv.appendChild(positionsImg);
			// };
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/intervals')
        .then(response => response.json())
        .then(data => {
			data.forEach(intervals => {
				drivers.forEach(driver => {
					if (driver.number === intervals['driver_number']) {
						driver.gapToLeader = intervals['gap_to_leader'];
					}
				});
			});
			let driver;
			drivers.sort((a, b) => a.position - b.position);
			for (let i = 0; i < drivers.length; i++) {
				driver = drivers[i];
				const positionsDiv = document.getElementById('positions');
				const positionsElement = document.createElement('p');
				const positionsImg = document.createElement('img');
				if (i === 0) {
					positionsElement.textContent = (i + 1) +  `. ${driver.name} - ${driver.team} - Leader`;
				}
				else if (driver.gapToLeader[1] === 'L')
					positionsElement.textContent = (i + 1) +  `. ${driver.name} - ${driver.team}  +${driver.gapToLeader} behind leader`;
				else
					positionsElement.textContent = (i + 1) +  `. ${driver.name} - ${driver.team}  +${driver.gapToLeader} seconds behind leader`;
				positionsImg.src = driver.photo;
				positionsDiv.appendChild(positionsElement);
				positionsDiv.appendChild(positionsImg);
			};
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
