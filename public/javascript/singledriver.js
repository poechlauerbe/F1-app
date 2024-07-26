const apiString = '/api/singledriver?driverNumber=';
let allDrivers = [];
let actualDriver = 0;

// const driverImage = document.createElement('img');
// driverImage.src = driver['photoUrl'];
// driversSelect.appendChild(driverImage);

const getDrivers = () => {
  fetch('/api/drivers')
    .then(response => response.json())
    .then(data => {
      const driversSelect = document.getElementById('drivers');
      driversSelect.innerHTML = '';
      allDrivers = [];
      const firstElement = document.createElement('option');
      firstElement.text = 'Select a driver';
      firstElement.value = 0;
      driversSelect.appendChild(firstElement);
      data.forEach(driver => {
        const driverElement = document.createElement('option');
        driverElement.text = `${driver.number} - ${driver.name}`;
        driverElement.value = driver.number;
        driversSelect.appendChild(driverElement);
        allDrivers.push(driver);
      });
    })
    .catch(error => {
      console.error('Error fetching drivers:', error);
    });
};

const loadSite = () => {
  if (!actualDriver || actualDriver === '0') return;
  const totalApiString = apiString + actualDriver;
  fetch(totalApiString)
    .then(response => response.json())
    .then(data => {
      const driverDiv = document.getElementById('singledriver');
      driverDiv.innerHTML = '';
      let i = 0;
      data.forEach(driverinfo => {
        if (i === 0) {
          if (driverinfo.brake > 0) {
            const brake = document.getElementById('brake');
            if (brake) {
              brake.id = 'brake-pressed';
            }
          } else {
            const brake = document.getElementById('brake-pressed');
            if (brake) {
              brake.id = 'brake';
            }
          }
          if (driverinfo.throttle > 0) {
            const throttle = document.getElementById('throttle');
            if (throttle) {
              throttle.id = 'throttle-pressed';
            }
          } else {
            const throttle = document.getElementById('throttle-pressed');
            if (throttle) {
              throttle.id = 'throttle';
            }
          }
          if (driverinfo.drs > 0) {
            const drs = document.getElementById('drs');
            if (drs) {
              drs.id = 'drs-on';
            }
          } else {
            const drs = document.getElementById('drs-on');
            if (drs) {
              drs.id = 'drs';
            }
          }
        }
        i++;
        const driverElem = document.createElement('p');
        driverElem.innerHTML = `Date: ${driverinfo.date}: Number: ${driverinfo.number}, gear: ${driverinfo.gear}, speed: ${driverinfo.speed}, throttle: ${driverinfo.throttle}, brake: ${driverinfo.brake}, drs: ${driverinfo.drs}, rpm: ${driverinfo.rpm}`;
        driverDiv.appendChild(driverElem);
      });
    })
    .catch(error => {
      console.error('Error fetching single driver infos:', error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  getDrivers();
  loadSite();
  setInterval(loadSite, 3000);
});

document.getElementById('drivers').addEventListener('change', function () {
  actualDriver = this.value;
  const driverDiv = document.getElementById('singledriver');
  driverDiv.innerHTML = '';
  changeDriverinfo();
  loadSite();
});

document.addEventListener('DOMContentLoaded', function () {
  const arrowButtons = document.querySelectorAll('.arrow-buttons');

  arrowButtons.forEach(button => {
    button.addEventListener('click', function () {
      const direction = this.getAttribute('data-direction');
      adjustTime(direction);
    });
  });
});

function changeDriverinfo () {
  const driverinfo = document.getElementById('driverinfo');
  driverinfo.innerHTML = '';
  if (actualDriver === 0) {
    return;
  }
  const driverElem = document.createElement('p');
  const driverImage = document.createElement('img');
  const driver = allDrivers.find(driver => driver.number === parseInt(actualDriver));
  if (driver) {
    driverElem.textContent = `Driver: ${driver.name}`;
    driverImage.src = driver.photoUrl;
    driverImage.alt = 'not available';
    driverinfo.appendChild(driverElem);
    driverinfo.appendChild(driverImage);
  }
}

function adjustTime (direction) {
  const timeInput = document.getElementById('time-input');
  let [minutes, seconds] = timeInput.value.split(':');
  let [sec, millis] = seconds.split('.');

  minutes = parseInt(minutes);
  sec = parseInt(sec);
  millis = parseInt(millis);

  if (direction === 'up') {
    millis += 500;
    if (millis >= 1000) {
      millis -= 1000;
      sec += 1;
    }
    if (sec >= 60) {
      sec -= 60;
      minutes += 1;
    }
  } else if (direction === 'down') {
    millis -= 100;
    if (millis < 0) {
      millis += 1000;
      sec -= 1;
    }
    if (sec < 0) {
      sec += 60;
      minutes -= 1;
    }
  }

  timeInput.value = `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
}
