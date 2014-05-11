'use strict';
/*jshint esnext: true */
/*global Promise: false */

function someAsyncThing(n) {
  console.log('someAsyncThing: n =', n);
  return new Promise((resolve, reject) => {
    if (n > 0) {
      resolve(n * 2);
    } else {
      reject('invalid input');
    }
  });
}

someAsyncThing(3).then(
  data => console.log('data =', data),
  err => console.error('error:', err));

// Executing promises in series for side effects.
// Only the last result is captured.
var err, v; // to make JSHint happy
someAsyncThing(1).
  then((v) => someAsyncThing(v)).
  then((v) => someAsyncThing(v)).
  //then((v) => someAsyncThing(-v)).
  then(v => console.log('success: v =', v)).
  catch((err) => console.log('error:', err));

// Executing promises in parallel and capturing all results.
var promises = [
  someAsyncThing(1),
  someAsyncThing(2),
  someAsyncThing(3)
];
Promise.all(promises).then(
  data => {
    console.log('all data =', data);
  },
  err => {
    console.error('all error:', err);
  });
