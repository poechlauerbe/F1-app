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
                trainingDataElm1.rowSpan = 3;
                trainingDataElm1.className = 'bottomBorderThick'
				trainingRowElm.appendChild(trainingDataElm1);

				const trainingDataElm2 = document.createElement('td')
				trainingDataElm2.textContent = driver['name'];
                trainingDataElm2.rowSpan = 3;
                trainingDataElm2.className = 'bottomBorderThick'
				trainingRowElm.appendChild(trainingDataElm2);

                const header1Elm = document.createElement('td')
                header1Elm.textContent = 'Actual'
                trainingRowElm.appendChild(header1Elm);

                const trainingDataElm3 = document.createElement('td')
				trainingDataElm3.textContent = driver['actualLap']['lapNr'];
				trainingRowElm.appendChild(trainingDataElm3);

                const trainingDataElmS1 = document.createElement('td')
                trainingDataElmS1.textContent = driver['actualLap']['timeS1'];
                trainingRowElm.appendChild(trainingDataElmS1);

                const trainingDataElmS2 = document.createElement('td')
                trainingDataElmS2.textContent = driver['actualLap']['timeS2'];
                trainingRowElm.appendChild(trainingDataElmS2);

                const trainingDataElmS3 = document.createElement('td')
                trainingDataElmS3.textContent = driver['actualLap']['timeS3'];
                trainingRowElm.appendChild(trainingDataElmS3);

                const trainingDataElmTime = document.createElement('td')
                trainingDataElmTime.textContent = driver['actualLap']['lapTime'];
                trainingRowElm.appendChild(trainingDataElmTime);

                const trainingDataTyreElm = document.createElement('td')
                trainingDataTyreElm.textContent = driver['tyre'];
                trainingRowElm.appendChild(trainingDataTyreElm);


                const trainingRow2Elm = document.createElement('tr');
                trainingDiv.appendChild(trainingRow2Elm);

                const header2Elm = document.createElement('td')
                header2Elm.textContent = 'Last Lap'
                trainingRow2Elm.appendChild(header2Elm);

                const trainingData2Elm3 = document.createElement('td')
				trainingData2Elm3.textContent = driver['lastLap']['lapNr'];
				trainingRow2Elm.appendChild(trainingData2Elm3);

                const trainingData2ElmS1 = document.createElement('td')
                trainingData2ElmS1.textContent = driver['lastLap']['timeS1'];
                trainingRow2Elm.appendChild(trainingData2ElmS1);

                const training2DataElmS2 = document.createElement('td')
                training2DataElmS2.textContent = driver['lastLap']['timeS2'];
                trainingRow2Elm.appendChild(training2DataElmS2);

                const trainingData2ElmS3 = document.createElement('td')
                trainingData2ElmS3.textContent = driver['lastLap']['timeS3'];
                trainingRow2Elm.appendChild(trainingData2ElmS3);

                const trainingData2ElmTime = document.createElement('td')
                trainingData2ElmTime.textContent = driver['lastLap']['lapTime'];
                trainingRow2Elm.appendChild(trainingData2ElmTime);

                const trainingData2TyreElm = document.createElement('td')
                trainingData2TyreElm.textContent = driver['tyre'];
                trainingRow2Elm.appendChild(trainingData2TyreElm);


                const trainingRow3Elm = document.createElement('tr');
                trainingDiv.appendChild(trainingRow3Elm);

                const header3Elm = document.createElement('td')
                header3Elm.textContent = 'Fastest Lap';
                header3Elm.className = 'bottomBorderThick';
                trainingRow3Elm.appendChild(header3Elm);

                const trainingData3Elm3 = document.createElement('td')
				trainingData3Elm3.textContent = driver['fastestLap']['lapNr'];
                trainingData3Elm3.className = 'bottomBorderThick'
				trainingRow3Elm.appendChild(trainingData3Elm3);

                const trainingData3ElmS1 = document.createElement('td')
                trainingData3ElmS1.textContent = driver['fastestLap']['timeS1'];
                trainingData3ElmS1.className = 'bottomBorderThick';
                trainingRow3Elm.appendChild(trainingData3ElmS1);

                const trainingData3ElmS2 = document.createElement('td')
                trainingData3ElmS2.textContent = driver['fastestLap']['timeS2'];
                trainingData3ElmS2.className = 'bottomBorderThick';
                trainingRow3Elm.appendChild(trainingData3ElmS2);

                const trainingData3ElmS3 = document.createElement('td')
                trainingData3ElmS3.textContent = driver['fastestLap']['timeS3'];
                trainingData3ElmS3.className = 'bottomBorderThick';
                trainingRow3Elm.appendChild(trainingData3ElmS3);

                const trainingData3ElmTime = document.createElement('td')
                trainingData3ElmTime.textContent = driver['fastestLap']['lapTime'];
                trainingData3ElmTime.className = 'bottomBorderThick';
                trainingRow3Elm.appendChild(trainingData3ElmTime);

                const trainingData3TyreElm = document.createElement('td')
                trainingData3TyreElm.textContent = driver['tyre'];
                trainingData3TyreElm.className = 'bottomBorderThick';
                trainingRow3Elm.appendChild(trainingData3TyreElm);
                // trainingRowElm.textContent = `Name: ${driver['name']}, Number: ${driver['number']}, Team: ${driver['team']}, Country: ${driver['country']}`;
                // trainingDiv.appendChild(driverImage);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});