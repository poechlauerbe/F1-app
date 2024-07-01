document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/drivers')
        .then(response => response.json())
        .then(data => {
			console.log(data);
            const driversDiv = document.getElementById('drivers');
            data.forEach(driver => {
                const driverElement = document.createElement('p');
                driverElement.textContent = `Name: ${driver['full_name']}, Number: ${driver['driver_number']}, Team: ${driver['team_name']}, Country: ${driver['country_code']}`;
                const driverImage = document.createElement('img');
                driverImage.src = driver['headshot_url'];
                driversDiv.appendChild(driverElement);
                driversDiv.appendChild(driverImage);
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
