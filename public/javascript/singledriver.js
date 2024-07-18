document.addEventListener('DOMContentLoaded', () => {
	fetch('/api/singledriver')
	.then(response => response.json())
	.then(data => {
		const driverDiv = document.getElementById('singledriver');
		driverDiv.innerHTML = '';
		data.forEach(driverinfo => {
			const driverElem = document.createElement('p');
			driverElem.innerHTML = `Number: ${driverinfo['number']}`;
			driverDiv.appendChild(driverElem);
		});
	})
	.catch(error => {
		console.error('Error fetching single driver infos:', error);
	});
});
