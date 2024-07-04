// function Driver(number, position, photo, name, team, laps, gapToLeader) {
// 	this.number = number;
// 	this.position = position;
// 	this.photo = photo;
// 	this.name = name;
// 	this.team = team;
// 	this.laps = laps;
// 	// this.time = time;
// 	this.gapToLeader = gapToLeader;
// }

// let drivers = [];


document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/positions')
        .then(response => response.json())
        .then(data => {
			const positionsDiv = document.getElementById('positions');
			for(let i = 1; i < 22; i++)
			{
				data.forEach(driver => {
					if (i == driver['position'])
					{
						const positionsElement = document.createElement('p');
						const positionsImg = document.createElement('img');
						positionsElement.textContent = (i) +  `. ${driver['name']} - ${driver['team']}`;
						positionsImg.src = driver['photo_url'];
						positionsDiv.appendChild(positionsElement);
						positionsDiv.appendChild(positionsImg);
					}
				});
			}
		})
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});

// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/api/intervals')
//         .then(response => response.json())
//         .then(data => {
// 			data.forEach(intervals => {
// 				drivers.forEach(driver => {
// 					if (driver.number === intervals['driver_number']) {
// 						driver.gapToLeader = intervals['gap_to_leader'];
// 					}
// 				});
// 			});
// 			let driver;
// 			drivers.sort((a, b) => a.position - b.position);
// 			for (let i = 0; i < drivers.length; i++) {
// 				driver = drivers[i];
// 				const positionsDiv = document.getElementById('positions');
// 				const positionsElement = document.createElement('p');
// 				const positionsImg = document.createElement('img');
// 				if (i === 0) {
// 					positionsElement.textContent = (i + 1) +  `. ${driver.name} - ${driver.team} - Leader`;
// 				}
// 				else if (driver.gapToLeader[1] === 'L')
// 					positionsElement.textContent = (i + 1) +  `. ${driver.name} - ${driver.team}  +${driver.gapToLeader} behind leader`;
// 				else
// 					positionsElement.textContent = (i + 1) +  `. ${driver.name} - ${driver.team}  +${driver.gapToLeader} seconds behind leader`;
// 				positionsImg.src = driver.photo;
// 				positionsDiv.appendChild(positionsElement);
// 				positionsDiv.appendChild(positionsImg);
// 			};
//         })
//         .catch(error => {
//             console.error('Error fetching drivers:', error);
//         });
// });
