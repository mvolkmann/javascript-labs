//import {capitalize} from './str-util';
/*global capitalize: false */

function load() {
  const text = 'gulp demo'
  let title = document.getElementById('title');
  title.textContent = capitalize(text);
}

console.log('loaded at', Date.now());

window.onload = load;
