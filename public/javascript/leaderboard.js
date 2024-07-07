
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/driversbyposition')
        .then(response => response.json())
        .then(data => {
			const positionsDiv = document.getElementById('positions');
			for(let i = 1; i < 22; i++)
			{
				data.forEach(driver => {
					if (i == driver['position'])
					{
						let textString = (i) +  `. ${driver['name']} - ${driver['team']}`;
						const positionsElement = document.createElement('p');
						const positionsImg = document.createElement('img');
						// make textstring and then put it into textContent
						if (i === 1) {
							textString +=  ` - Leader`;
						}
						else if (driver.gapToLeader[1] === 'L')
							textString +=  ` +${driver['gapToLeader']} behind leader`;
						else if (driver.gapToLeader)
							textString +=  ` +${driver['gapToLeader']} seconds behind leader`;
						positionsElement.textContent = textString
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
