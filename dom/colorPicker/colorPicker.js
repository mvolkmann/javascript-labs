'use strict';

var blueInput, greenInput, redInput, swatch;

function getColor() {
  return 'rgb(' + redInput.value + ', ' +
    greenInput.value + ', ' + blueInput.value + ')';
}

function ok() {
  var domain, loc;

  loc = window.location;
  domain = loc.protocol + '//' + loc.host;
  // Can use '*' for targetOrigin to send to windows from any domain.
  // May be able to use 'file://' when files are local.
  window.opener.postMessage(getColor(), domain);
  window.close();
}

function setColor(color) {
  var index, pieces, s;

  // Get RGB values.
  index = color.indexOf('(');
  s = color.substring(index + 1);
  index = s.indexOf(')');
  s = s.substring(0, index);
  pieces = s.split(',');

  redInput.value = parseInt(pieces[0], 10);
  greenInput.value = parseInt(pieces[1], 10);
  blueInput.value = parseInt(pieces[2], 10);
  swatch.style.backgroundColor = color;
}

function updateSwatch() {
  swatch.style.backgroundColor = getColor();
}

window.addEventListener('message', function (event) {
  setColor(event.data);
}, false);

window.onload = function () {
  var $ = document.getElementById.bind(document);
  redInput = $('red');
  greenInput = $('green');
  blueInput = $('blue');
  swatch = $('swatch');

  redInput.onchange = updateSwatch;
  greenInput.onchange = updateSwatch;
  blueInput.onchange = updateSwatch;

  $('okBtn').onclick = ok;
  $('closeBtn').onclick = function () { window.close(); };
};
