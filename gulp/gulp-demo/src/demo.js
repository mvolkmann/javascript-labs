//import {capitalize} from './str-util';
/*global capitalize: false */

function load() {
  const text = 'gulp demo';
  let title = document.getElementById('title');
  title.textContent = capitalize(text);
}

window.onload = load;
