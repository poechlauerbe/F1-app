import { options2 } from './mod_options.js';

export function addEventToHtmlList(gpListDiv, event) {
  const pitElem = document.createElement('li');
  const date = new Date(event.start);
  const timeString = date.toLocaleTimeString([], options2);

  pitElem.innerHTML = `${timeString}: ${event.name} - ${event.location} - ${event.category}`;
  pitElem.className = 'line-height-2';
  gpListDiv.appendChild(pitElem);
}
