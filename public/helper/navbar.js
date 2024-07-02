function addElementNav (text, href) {
	for (let i = 0; i < document.getElementsByTagName('nav').length; i++) {
	  let element = document.createElement('a');
	  element.innerHTML = text;
	  element.href = href;
	  document.getElementsByTagName('nav')[i].appendChild(element);
	}
}

function addElementList(text, href) {
	  let element = document.createElement('a');
	  element.innerHTML = text;
	  element.href = href;
	  let listItem = document.createElement('li');
	  listItem.appendChild(element);
	  document.getElementById('pages').appendChild(listItem);
}

document.getElementsByTagName('nav')[0].innerHTML = '';
addElementNav('Home', 'index.html');
addElementNav('Drivers', 'drivers.html');
addElementNav('Race Leaderboard', 'leaderboard.html');
addElementNav('Race Control','race_control.html');
addElementNav('Team Radio','teamradio.html');

document.getElementById('pages').innerHTML = '';
addElementList('Drivers', 'drivers.html');
addElementList('Race Leaderboard', 'leaderboard.html');
addElementList('Race Control', 'race_control.html');
addElementList('Team Radio', 'teamradio.html');
