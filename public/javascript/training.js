document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/drivers')
        .then(response => response.json())
        .then(data => {
            const trainingDiv = document.getElementById('training');
            data.forEach(driver => {
                const trainingRowElm = document.createElement('tr');
                trainingDiv.appendChild(trainingRowElm);
				const trainingDataElm1 = document.createElement('td')
				trainingDataElm1.textContent = driver['number'];
				trainingRowElm.appendChild(trainingDataElm1);

				const trainingDataElm2 = document.createElement('td')
				trainingDataElm2.textContent = driver['name'];
				trainingRowElm.appendChild(trainingDataElm2);
                // trainingRowElm.textContent = `Name: ${driver['name']}, Number: ${driver['number']}, Team: ${driver['team']}, Country: ${driver['country']}`;
                // trainingDiv.appendChild(driverImage);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});