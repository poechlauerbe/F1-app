document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/drivers')
  .then(response => response.json())
  .then(data => {
    const driversDiv = document.getElementById('drivers');
    driversDiv.innerHTML = '';
    data.forEach(driver => {
      const driverElement = document.createElement('p');
      driverElement.textContent = `Name: ${driver['name']}, Number: ${driver['number']}, Team: ${driver['team']}, Country: ${driver['country']}`;
      const driverImage = document.createElement('img');
      driverImage.src = driver.photo_url;
      driverImage.alt = 'not available';
      driversDiv.appendChild(driverElement);
      driversDiv.appendChild(driverImage);
    });
  })
  .catch(error => {
    console.error('Error fetching drivers:', error);
  });
});

// only update when change in session id is detected
