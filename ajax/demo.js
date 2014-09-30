'use strict';

var foo = function (bar, baz) {
  console.log('in foo');
}

let bar_3a = function (foo, baz) {
  try {
    console.log('in bar');
  } catch (e) {
    console.error(e);
  }
}

let baz = (x, y) => {
  console.log('in baz');
}

function $(id) {
  return document.getElementById(id);
}

function getNumbers() {
  var lines, numbers;

  lines = $('numberArea').value.split('\n');

  // Convert strings to floating point numbers.
  numbers = lines.map(function (line) {
    line = line.trim();
    return line.length === 0 ? Number.NaN : parseFloat(line);
  });

  // Remove NaN values.
  return numbers.filter(function (number) { return !isNaN(number); });
}

function post(operation) {
  var body, numbers, xhr;

  numbers = getNumbers();
  body = JSON.stringify(numbers);

  xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/' + operation);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      $('result').textContent = xhr.responseText;
    }
  };

  xhr.send(body);
}

window.onload = function () {
  $('sumBtn').onclick = function () { post('sum'); };
  $('productBtn').onclick = function () { post('product'); };
  $('averageBtn').onclick = function () { post('average'); };
};
