'use strict';

var WHITE = 'rgb(255, 255, 255)';

function colorPicker() {
  var features, win;

  features = 'height=310,width=400,left=200,top=150';
  win = window.open('colorPicker.html', 'Color Picker', features);

  win.addEventListener('load', function () {
    var color, domain, loc;

    color = document.body.style.backgroundColor || WHITE;
    loc = window.location;
    domain = loc.protocol + '//' + loc.host;
    win.postMessage(color, domain);
  }, false);

  window.addEventListener('message', function (event) {
    // Check event.origin to verify sender.
    var color = event.data;
    document.body.style.backgroundColor = color;
  }, false);
}

window.onload = function () {
  var btn = document.getElementById('bgBtn');
  btn.onclick = colorPicker;

  window.onoffline = function () { alert('offline'); };
  window.ononline = function () { alert('online'); };
};
