import { options2 } from "./services/mod_options.js";

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/schedule')
        .then(response => response.json())
        .then(data => {
			let i = 0;
			let location = '';
            const gpListBaseDiv = document.getElementById('next-event');
            gpListBaseDiv.innerHTML = '';
			const gpListDiv = document.createElement('ul');
			gpListBaseDiv.appendChild(gpListDiv);
            data.forEach(event => {
				if (new Date().toISOString() < event.end && i < 10) {
					if (i === 0)
						location = event.location;
					if (event.location !== location)
						return ;
					const pitElem = document.createElement('li');
					const date = new Date(event['start']);
                	const timeString = date.toLocaleTimeString([], options2);
					pitElem.innerHTML = `${timeString}: ${event.name} - ${event.location} - ${event.category}`;
					pitElem.className = 'line-height-2';
					gpListDiv.appendChild(pitElem);
					i++;
				}
            });
        })
        .catch(error => {
            console.error('Error fetching pit infos:', error);
        });
});
