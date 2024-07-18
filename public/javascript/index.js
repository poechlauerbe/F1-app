document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/schedule')
        .then(response => response.json())
        .then(data => {
			let i = 0;
            const gpListBaseDiv = document.getElementById('next-event');
            gpListBaseDiv.innerHTML = '';
			const gpListDiv = document.createElement('ul');
			gpListBaseDiv.appendChild(gpListDiv);
            data.forEach(event => {
				if (new Date().toISOString() < event.end && i < 5) {
					console.log(event.start)
					const pitElem = document.createElement('li');
					pitElem.innerHTML = `${event.name} - ${event.start} - ${event.location} - ${event.category}`;
					pitElem.className = 'line-height-2';
					gpListDiv.appendChild(pitElem);
					i++;
				}
				// const pitElem = document.createElement('li');
				// pitElem.innerHTML = `${event.name} - ${event.country} - ${event.dateStart} - ${event.gmtOffset}`;
                // pitElem.className = 'line-height-2';
				// gpListDiv.appendChild(pitElem);
            });
			console.log(data);
        })
        .catch(error => {
            console.error('Error fetching pit infos:', error);
        });
});
