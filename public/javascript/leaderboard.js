function loadSite () {
  fetch('/api/driversbyposition')
    .then(response => response.json())
    .then(data => {
      const positionsDiv = document.getElementById('positions');
      positionsDiv.innerHTML = '';
      console.log(data);
      data.forEach(driver => {
        let textString =
          driver.position + `. ${driver.name} - ${driver.team}`;
        const positionsElement = document.createElement('p');
        const positionsImg = document.createElement('img');
        // make textstring and then put it into textContent
        if (driver.position === 1) {
          textString += ' - Leader';
        } else if (driver.gapToLeader && driver.gapToLeader[1] === 'L') {
          textString += ` +${driver.gapToLeader} behind leader`;
        } else if (driver.gapToLeader) {
          textString += ` +${driver.gapToLeader} seconds behind leader`;
        }

        positionsElement.textContent = textString;
        positionsImg.src = driver.photoUrl;
        positionsDiv.appendChild(positionsElement);
        positionsDiv.appendChild(positionsImg);
      });
    })
    .catch(error => {
      console.error('Error fetching drivers:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadSite();
  setInterval(loadSite, 10000);
});
