const loadSite = () => {
	fetch('/api/singledriver')
	.then(response => response.json())
	.then(data => {
		const driverDiv = document.getElementById('singledriver');
		driverDiv.innerHTML = '';
		console.log(data);
		data.forEach(driverinfo => {
			const driverElem = document.createElement('p');
			driverElem.innerHTML = `Date: ${driverinfo['date']}: Number: ${driverinfo['number']}, gear: ${driverinfo['gear']}, speed: ${driverinfo['speed']}, throttle: ${driverinfo['throttle']}, brake: ${driverinfo['brake']}, drs: ${driverinfo['drs']}, rpm: ${driverinfo['rpm']}`;
			driverDiv.appendChild(driverElem);
		});
	})
	.catch(error => {
		console.error('Error fetching single driver infos:', error);
	});
};

document.addEventListener('DOMContentLoaded', () => {
    loadSite();
    setInterval(loadSite, 3000);
});