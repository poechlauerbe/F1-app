
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
						if (i === 1) {
							positionsElement.textContent = (i) +  `. ${driver['name']} - ${driver['team']} - Leader`;
						}
						else if (driver.gapToLeader[1] === 'L')
							positionsElement.textContent = (i) +  `. ${driver['name']} - ${driver['team']}  +${driver['gapToLeader']} behind leader`;
						else
							positionsElement.textContent = (i) +  `. ${driver['name']} - ${driver['team']}  +${driver['gapToLeader']} seconds behind leader`;
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
