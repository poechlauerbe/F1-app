const apiString = '/api/singledriver?driverNumber=';
let allDrivers = [];
let actualDriver = 0;
let carData = [];
let date = new Date();
let timeGap = 0;

const updateObjects = () => {
  let iter = 0;
  date = new Date();
  date.setMilliseconds(date.getMilliseconds() - timeGap);
  while (carData.length > 0 && date.toISOString() > new Date(carData[iter].date).toISOString() && iter < carData.length - 1) {
    iter++;
  }
  // console.log(date.toISOString());
  if (carData.length > iter) {
    console.log('2: ' + new Date(carData[iter].date).toISOString());
    console.log(iter);
  }
  // Add 300 milliseconds to the Date object
  if (carData.length > 0) {
    if (carData[iter].brake > 0 && carData[iter].brake <= 100) {
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
    if (carData[iter].throttle > 0 && carData[iter].throttle <= 100) {
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
    if (carData[iter].drs > 10) {
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
    console.log(carData[iter]);
    if (carData[iter].tyre) {
      const tyreTypes = ['tyre-soft', 'tyre-medium', 'tyre-hard', 'tyre'];
      for (let i = 0; i < tyreTypes.length; i++) {
        const tyre = document.getElementById(tyreTypes[i]);
        if (tyre) {
          if (carData[iter].tyre === 'SOFT') {
            tyre.id = 'tyre-soft';
            tyre.textContent = 'Soft';
          } else if (carData[iter].tyre === 'MEDIUM') {
            tyre.id = 'tyre-medium';
            tyre.textContent = 'Medium';
          } else if (carData[iter].tyre === 'HARD') {
            tyre.id = 'tyre-hard';
            tyre.textContent = 'Hard';
          } else {
            tyre.id = 'tyre';
            tyre.textContent = 'Compound';
          }
        }
      }
    }
    const tacho = document.getElementById('tacho');
    tacho.innerHTML = carData[iter].speed;
    const rpm = document.getElementById('rpm');
    rpm.innerHTML = carData[iter].rpm;
    const gear = document.getElementById('gear');
    gear.innerHTML = carData[iter].gear;
  }
  if (iter < carData.length - 1) {
    iter++;
  }
};

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
      const carData2 = [];
      data.forEach(driverinfo => {
        carData2.push(driverinfo);
        const driverElem = document.createElement('p');
        driverElem.innerHTML = `Date: ${driverinfo.date}: Number: ${driverinfo.number}, gear: ${driverinfo.gear}, speed: ${driverinfo.speed}, throttle: ${driverinfo.throttle}, brake: ${driverinfo.brake}, drs: ${driverinfo.drs}, rpm: ${driverinfo.rpm}`;
        driverDiv.appendChild(driverElem);
      });
      carData = [];
      carData = carData2;
    })
    .catch(error => {
      console.error('Error fetching single driver infos:', error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  getDrivers();
  adjustTime('none');
  loadSite();
  setInterval(loadSite, 6000);
  setInterval(updateObjects, 300);
});

document.getElementById('drivers').addEventListener('change', function () {
  actualDriver = this.value;
  const driverDiv = document.getElementById('singledriver');
  driverDiv.innerHTML = '';
  changeDriverinfo();
  loadSite();
  updateObjects();
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
  carData = [];
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
    millis -= 500;
    if (millis < 0) {
      millis += 1000;
      sec -= 1;
    }
    if (sec < 0) {
      sec += 60;
      minutes -= 1;
    }
  }

  timeGap = minutes * 60 * 1000 + sec * 1000 + millis;
  console.log(timeGap);
  timeInput.value = `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
}
