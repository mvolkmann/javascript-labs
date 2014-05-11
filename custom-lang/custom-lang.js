'use strict';

function processCustom(script) {
  var newCode = '';

  var lines = script.trim().split('\n');
  lines.forEach(function (line) {
    var tokens = line.trim().split(' ');
    var first = tokens.shift();
    if (first === 'say') {
      var rest = tokens.join(' ');
      newCode += '\nalert("' + rest + '");';
    } else {
      console.log(first + ' is an unrecognized token.');
    }
  });

  var newScript = document.createElement('script');
  newScript.textContent = newCode + '\n';
  document.body.appendChild(newScript);
}

window.onload = function () {
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts.item(i);
    var type = script.getAttribute('type');
    if (type === 'text/custom') processCustom(script.textContent);
  }
};
