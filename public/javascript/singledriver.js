document.addEventListener('DOMContentLoaded', () => {
	fetch('/api/singledriver')
	.then(response => response.json())
	.then(data => {
		const driverDiv = document.getElementById('singledriver');
		driverDiv.innerHTML = '';
		data.forEach(driverinfo => {
			const driverElem = document.createElement('p');
			driverElem.innerHTML = `Number: ${driverinfo['driver_number']} | Lap: ${driverinfo['lap_number']} | Time: ${driverinfo['lap_duration']}`;
			driverDiv.appendChild(driverElem);
		});
	})
	.catch(error => {
		console.error('Error fetching single driver infos:', error);
	});
});
