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

                const trainingDataElm3 = document.createElement('td')
				trainingDataElm3.textContent = driver['lastLap']['lapNr'];
				trainingRowElm.appendChild(trainingDataElm3);

                const trainingDataElmS1 = document.createElement('td')
                trainingDataElmS1.textContent = driver['lastLap']['timeS1'];
                trainingRowElm.appendChild(trainingDataElmS1);

                const trainingDataElmS2 = document.createElement('td')
                trainingDataElmS2.textContent = driver['lastLap']['timeS2'];
                trainingRowElm.appendChild(trainingDataElmS2);


                const trainingDataElmS3 = document.createElement('td')
                trainingDataElmS3.textContent = driver['lastLap']['timeS3'];
                trainingRowElm.appendChild(trainingDataElmS3);

                const trainingDataElmTime = document.createElement('td')
                trainingDataElmTime.textContent = driver['lastLap']['lapTime'];
                trainingRowElm.appendChild(trainingDataElmTime);

                const trainingDataTyreElm = document.createElement('td')
                trainingDataTyreElm.textContent = driver['tyre'];
                trainingRowElm.appendChild(trainingDataTyreElm);
                // trainingRowElm.textContent = `Name: ${driver['name']}, Number: ${driver['number']}, Team: ${driver['team']}, Country: ${driver['country']}`;
                // trainingDiv.appendChild(driverImage);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});