function loadSite() {
    fetch('/api/driversbyposition')
        .then(response => response.json())
        .then(data => {
            const lapTimesDiv = document.getElementById('laptimes');
            lapTimesDiv.innerHTML = '';
            data.forEach(driver => {
                const lapTimesRowElm = document.createElement('tr');
                lapTimesDiv.appendChild(lapTimesRowElm);
				const lapTimesDataElm1 = document.createElement('td')
				lapTimesDataElm1.textContent = driver['position'];
                lapTimesDataElm1.rowSpan = 3;
                lapTimesDataElm1.className = 'bottomBorderThick'
				lapTimesRowElm.appendChild(lapTimesDataElm1);

				const lapTimesDataElm2 = document.createElement('td')
				lapTimesDataElm2.textContent = driver['name'];
                lapTimesDataElm2.rowSpan = 3;
                lapTimesDataElm2.className = 'bottomBorderThick'
				lapTimesRowElm.appendChild(lapTimesDataElm2);

                const lapTimesDataNrElm = document.createElement('td')
				lapTimesDataNrElm.textContent = driver['number'];
                lapTimesDataNrElm.rowSpan = 3;
                lapTimesDataNrElm.className = 'bottomBorderThick'
				lapTimesRowElm.appendChild(lapTimesDataNrElm);

                const header1Elm = document.createElement('td')
                header1Elm.textContent = 'Actual'
                lapTimesRowElm.appendChild(header1Elm);

                const lapTimesDataElm3 = document.createElement('td')
				lapTimesDataElm3.textContent = driver['actualLap']['lapNr'];
				lapTimesRowElm.appendChild(lapTimesDataElm3);

                const lapTimesDataElmS1 = document.createElement('td')
                lapTimesDataElmS1.textContent = driver['actualLap']['timeS1'];
                lapTimesRowElm.appendChild(lapTimesDataElmS1);

                const lapTimesDataElmS2 = document.createElement('td')
                lapTimesDataElmS2.textContent = driver['actualLap']['timeS2'];
                lapTimesRowElm.appendChild(lapTimesDataElmS2);

                const lapTimesDataElmS3 = document.createElement('td')
                lapTimesDataElmS3.textContent = driver['actualLap']['timeS3'];
                lapTimesRowElm.appendChild(lapTimesDataElmS3);

                const lapTimesDataElmTime = document.createElement('td')
                lapTimesDataElmTime.textContent = driver['actualLap']['lapTime'];
                lapTimesRowElm.appendChild(lapTimesDataElmTime);

                const lapTimesDataTyreElm = document.createElement('td')
                lapTimesDataTyreElm.textContent = driver['tyre'];
                lapTimesRowElm.appendChild(lapTimesDataTyreElm);


                const lapTimesRow2Elm = document.createElement('tr');
                lapTimesDiv.appendChild(lapTimesRow2Elm);

                const header2Elm = document.createElement('td')
                header2Elm.textContent = 'Last Lap'
                lapTimesRow2Elm.appendChild(header2Elm);

                const lapTimesData2Elm3 = document.createElement('td')
				lapTimesData2Elm3.textContent = driver['lastLap']['lapNr'];
				lapTimesRow2Elm.appendChild(lapTimesData2Elm3);

                const lapTimesData2ElmS1 = document.createElement('td')
                lapTimesData2ElmS1.textContent = driver['lastLap']['timeS1'];
                lapTimesRow2Elm.appendChild(lapTimesData2ElmS1);

                const lapTimes2DataElmS2 = document.createElement('td')
                lapTimes2DataElmS2.textContent = driver['lastLap']['timeS2'];
                lapTimesRow2Elm.appendChild(lapTimes2DataElmS2);

                const lapTimesData2ElmS3 = document.createElement('td')
                lapTimesData2ElmS3.textContent = driver['lastLap']['timeS3'];
                lapTimesRow2Elm.appendChild(lapTimesData2ElmS3);

                const lapTimesData2ElmTime = document.createElement('td')
                lapTimesData2ElmTime.textContent = driver['lastLap']['lapTime'];
                lapTimesRow2Elm.appendChild(lapTimesData2ElmTime);

                const lapTimesData2TyreElm = document.createElement('td')
                lapTimesData2TyreElm.textContent = driver['tyre'];
                lapTimesRow2Elm.appendChild(lapTimesData2TyreElm);


                const lapTimesRow3Elm = document.createElement('tr');
                lapTimesDiv.appendChild(lapTimesRow3Elm);

                const header3Elm = document.createElement('td')
                header3Elm.textContent = 'Fastest Lap';
                header3Elm.className = 'bottomBorderThick';
                lapTimesRow3Elm.appendChild(header3Elm);

                const lapTimesData3Elm3 = document.createElement('td')
				lapTimesData3Elm3.textContent = driver['fastestLap']['lapNr'];
                lapTimesData3Elm3.className = 'bottomBorderThick'
				lapTimesRow3Elm.appendChild(lapTimesData3Elm3);

                const lapTimesData3ElmS1 = document.createElement('td')
                lapTimesData3ElmS1.textContent = driver['fastestLap']['timeS1'];
                lapTimesData3ElmS1.className = 'bottomBorderThick';
                lapTimesRow3Elm.appendChild(lapTimesData3ElmS1);

                const lapTimesData3ElmS2 = document.createElement('td')
                lapTimesData3ElmS2.textContent = driver['fastestLap']['timeS2'];
                lapTimesData3ElmS2.className = 'bottomBorderThick';
                lapTimesRow3Elm.appendChild(lapTimesData3ElmS2);

                const lapTimesData3ElmS3 = document.createElement('td')
                lapTimesData3ElmS3.textContent = driver['fastestLap']['timeS3'];
                lapTimesData3ElmS3.className = 'bottomBorderThick';
                lapTimesRow3Elm.appendChild(lapTimesData3ElmS3);

                const lapTimesData3ElmTime = document.createElement('td')
                lapTimesData3ElmTime.textContent = driver['fastestLap']['lapTime'];
                lapTimesData3ElmTime.className = 'bottomBorderThick';
                lapTimesRow3Elm.appendChild(lapTimesData3ElmTime);

                const lapTimesData3TyreElm = document.createElement('td')
                lapTimesData3TyreElm.textContent = driver['tyre'];
                lapTimesData3TyreElm.className = 'bottomBorderThick';
                lapTimesRow3Elm.appendChild(lapTimesData3TyreElm);
                // lapTimesRowElm.textContent = `Name: ${driver['name']}, Number: ${driver['number']}, Team: ${driver['team']}, Country: ${driver['country']}`;
                // lapTimesDiv.appendChild(driverImage);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
};

document.addEventListener('DOMContentLoaded', () => {
    loadSite();
    setInterval(loadSite, 10000);
});
