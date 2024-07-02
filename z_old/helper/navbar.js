function addElementNav (text, href) {

	  let element = document.createElement('a');
	  element.innerHTML = text;
	  element.href = href;
	  document.getElementsByTagName('nav')[0].appendChild(element);
}

document.getElementsByTagName('nav')[0].innerHTML = '';
addElementNav('Home', 'index.html');
addElementNav('Drivers', 'drivers.html');
addElementNav('Race Leaderboard', 'leaderboard.html');
addElementNav('Race Control','race_control.html');
addElementNav('Team Radio','teamradio.html');

// also update pages.js
