'use strict';
/*jshint esnext: true */
/*global Promise: false */

function asyncDouble(n) {
  return new Promise((resolve, reject) => {
    if (typeof n === 'number') {
      resolve(n * 2);
    } else {
      reject(n + ' is not a number');
    }
  });
}

asyncDouble(3).then(
  //data => console.log('data =', data),
  data => {
    throw 'Did you see this?'; // no, you didn't!
    console.log('data =', data);
  },
  err => console.error('error:', err));

// Executing promises in series for side effects.
// Only the last result is captured.
var err, v; // to make JSHint happy
asyncDouble(1).
  then((v) => asyncDouble(v)).
  then((v) => asyncDouble(v)).
  //then((v) => asyncDouble('bad')).
  then((v) => console.log('success: v =', v)).
  catch((err) => console.log('error:', err));

// Executing promises in parallel and capturing all results.
var promises = [
  asyncDouble(1),
  asyncDouble(2),
  asyncDouble(3)
];
Promise.all(promises).then(
  data => {
    console.log('all data =', data);
  },
  err => {
    console.error('all error:', err);
  });
