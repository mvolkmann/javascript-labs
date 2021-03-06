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

// Executing promises in series for side effects.
// Only the last result is captured.
let err, v; // to make JSHint happy
asyncDouble(1).
  then(v => asyncDouble(v)).
  then(v => asyncDouble(v)).
  //then((v) => asyncDouble('bad')).
  then(v => console.log('success: v =', v)).
  catch(err => console.error('error:', err));

// Executing promises in parallel and capturing all results.
let promises = [
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

let p = asyncDouble(3).then(
  v => {
    // This causes the promise returned by
    // the call to then above to be rejected.
    throw 'Did you see this?';
  },
  err => console.error('error:', err)); // not reached

p.then(
  value => console.log('resolved with', value),
  reason => console.log('rejected with', reason));
