document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/drivers')
        .then(response => response.json())
        .then(data => {
            data.forEach(driver => {
				drivers.push(new Driver(driver['driver_number'], 0, driver['headshot_url'], driver['full_name'], driver['team_name'], 0, driver['time'], 'active'));
            });
        })
        .catch(error => {
            console.error('Error fetching drivers:', error);
        });
});
