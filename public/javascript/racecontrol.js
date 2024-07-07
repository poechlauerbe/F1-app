import { options } from "./services/mod_options.js";

let blueFlag = 0;
// let siteLoading = false; enventually add check if site is loading to prevent multiple fetches

function loadSite() {
    fetch('/api/race_control')
        .then(response => response.json())
        .then(data => {
            document.getElementById('race-control').innerHTML = '';
            const raceControlDiv = document.getElementById('race-control');
            data.reverse().forEach(raceControl => {
                const raceControlElement = document.createElement('p');
                const date = new Date(raceControl['date']);
                const timeString = date.toLocaleTimeString([], options);
				if (raceControl['driver_number'] == null)
                {
                    if (raceControl['message'].includes('GREEN FLAG') || raceControl['message'].includes('OPEN') || raceControl['message'].includes('CLEAR'))
                        raceControlElement.className = 'green-flag';
                    else if (raceControl['message'].includes('YELLOW'))
                        raceControlElement.className = 'yellow-flag';
                    else if (raceControl['message'].includes('CHEQUERED FLAG'))
                        raceControlElement.className = 'finish-flag';
                    else if (raceControl['message'].includes('RED FLAG') || raceControl['message'].includes('CLOSED'))
                        raceControlElement.className = 'red-flag';
                    else if (raceControl['message'].includes('PENALTY'))
                        raceControlElement.className = 'penalty';
                    else if (raceControl['message'].includes('BLACK FLAG'))
                        raceControlElement.className = 'black-flag';
                    else if (raceControl['message'].includes('SAFETY CAR'))
                        raceControlElement.className = 'safety-car';
                    else if (raceControl['message'].includes('DRS ENABLED'))
                        raceControlElement.className = 'drs-enabled';
                    else if (raceControl['message'].includes('DRS DISABLED'))
                        raceControlElement.className = 'drs-disabled';
                    else if (raceControl['message'].includes('FIA STEWARDS'))
                        raceControlElement.className = 'fia-stewards';
                    else if (raceControl['message'].includes('NOTED'))
                        raceControlElement.className = 'noted';
                    else if (raceControl['message'].includes('TRACK LIMITS'))
                        raceControlElement.className = 'track-limits';
					raceControlElement.textContent = timeString + '	' + raceControl['message'];
                }
				else if (blueFlag % 2)
                {
	                raceControlElement.textContent = timeString + ` ${raceControl['message']}`;
                    raceControlElement.className = 'blue-flag';
                }
                raceControlDiv.appendChild(raceControlElement);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
}

document.getElementById('blue-flag').addEventListener('click', () => {
    blueFlag++;
    document.getElementById('blue-flag').textContent = blueFlag % 2 ? 'Blue Flag ON' : 'Blue Flag OFF';
    document.getElementById('blue-flag').style.backgroundColor = blueFlag % 2 ? 'blue' : 'white';
    document.getElementById('blue-flag').style.color = blueFlag % 2 ? 'white' : 'black';
    document.getElementById('blue-flag').style.borderColor = blueFlag % 2 ? 'blue' : 'black';
    document.getElementById('blue-flag').style.borderRadius = '5px';
    loadSite();
});

document.addEventListener('DOMContentLoaded', () => {
    loadSite();
    setInterval(loadSite, 10000);
});
