'use strict';
/*global CustomEvent: false */

function emit(color) {
  var event = new CustomEvent('color', {detail: color});
  document.dispatchEvent(event);
}

var go = setInterval;

function byId(id) { return document.getElementById(id); }

byId('red-btn').onclick = go.bind(null, emit.bind(null, 'red'), 250);

byId('blue-btn').onclick = go.bind(null, emit.bind(null, 'blue'), 1000);

var list = byId('list');
document.addEventListener('color', function (event) {
  var div = document.createElement('div');
  div.textContent = event.detail;
  list.appendChild(div);
});
