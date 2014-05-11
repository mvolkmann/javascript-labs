'use strict';
/*jshint esnext: true */

var firstName = 'Mark';
var lastName = 'Volkmann';

var result = `Hello ${firstName} ${lastName}!`;
console.log('untagged =', result);

var mls = `one
two
three`;
console.log('mls =', mls);

// Could perform special escaping of the parts or the data.
// I think what Traceur passes for the first parameter
// doesn't match the spec.
//function process({raw, cooked}, ...data) {
function process(parts, ...data) {
  //console.log('parts =', parts);
  //console.log('data =', data);
  var result = parts.shift();
  var i = 0;
  for (var part of parts) {
    var d = data[i++];
    result += d.toUpperCase() + part;
  }
  return result;
}
result = process `Hello ${firstName} ${lastName}!`;
console.log('tagged =', result);
