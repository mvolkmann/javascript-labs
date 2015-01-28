'use strict';
/*jshint esnext: true */

let firstName = 'Mark';
let lastName = 'Volkmann';

let result = `Hello ${firstName} ${lastName}!`;
console.log('untagged =', result);

let mls = `one
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
  let result = parts.shift();
  let i = 0;
  for (let part of parts) {
    let d = data[i++];
    result += d.toUpperCase() + part;
  }
  return result;
}
result = process `Hello ${firstName} ${lastName}!`;
console.log('tagged =', result);
