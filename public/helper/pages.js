function addElementList(text, href) {
	let element = document.createElement('a');
	element.innerHTML = text;
	element.href = href;
	let listItem = document.createElement('li');
	listItem.appendChild(element);
	document.getElementById('pages').appendChild(listItem);
}

document.getElementById('pages').innerHTML = '';
addElementList('Drivers', 'drivers.html');
addElementList('Race Leaderboard', 'leaderboard.html');
addElementList('Race Control', 'race_control.html');
addElementList('Team Radio', 'teamradio.html');

// also update navbar.js

