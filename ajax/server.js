'use strict';

// Can test this will curl like this:
// curl -XPOST http://localhost:3000/sum \
//   -H'Content-Type: application/json' -d"[1, 2, 3, 4]"

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Serve static files in the current directory.
app.use(express.static(__dirname));

// Automatically parse JSON in request bodies into JavaScript values.
app.use(bodyParser());

function average(numbers) {
  return numbers.length ? sum(numbers) / numbers.length : 0;
}

function product(numbers) {
  return numbers.length ?
    numbers.reduce(function (a, b) { return a * b; }) :
    0;
}

function sum(numbers) {
  return numbers.length ?
    numbers.reduce(function (a, b) { return a + b; }) :
    0;
}

function handle(fn, req, res) {
  res.contentType('application/json');
  res.send(JSON.stringify(fn(req.body)));
}

app.post('/average', handle.bind(null, average));
app.post('/product', handle.bind(null, product));
app.post('/sum', handle.bind(null, sum));

var PORT = 3000;
app.listen(PORT);
console.log('listening on port', PORT);
