/*jshint esnext: true */
/*global Promise: false */

// This returns a promise that
// resolves to the given value if it's not an Error and
// rejects the given value if it is an Error
function makePromise(value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Error) {
      reject(value);
    } else {
      resolve(value);
    }
  });
}

let p1 = makePromise(1);
let p2 = makePromise(2);
//let p2 = makePromise(new Error('foo'));
let p3 = makePromise(3);
//let p3 = makePromise(new Error('bar'));

// Always pass a function to the Promise methods "then" and "catch".
//
// The "then" method for each promise can do three things:
// 1) returns the next promise to wait for
//    - next "then" function will be passed the value to which it resolves
// 2) return a non-Promise value
//    - next "then" function will be passed this value
// 3) throw
//    - "catch" function at end will be passed the thrown value
//
// In some cases it makes sense for a "then" function
// to conditionally decide whether to return a Promise
// or a non-Promise value (perhaps a cached value).
//
// If any promise in the chain rejects,
// execution goes the catch at the end.
//
// If any "then" function in the chain throws,
// execution goes the catch at the end.

p1.then(v => {
  console.log(v);
  return p2; // returning another promise
  //return 19; // returning a value instead of another promise
}).then(v => {
  console.log(v);
  //throw new Error('bail');
  return p3; // return another promise
}).then(v => {
  console.log(v);
  // no more work to do
}).catch(e => {
  console.error('error message =', e.message);
});

// This example demonstrates a why to make promise chaining more readable
// by passing functions to the "then" method that do two common things:
// 1) process the resolved value of the previous Promise
// 2) return the next promise to wait for

function getLogAndReturnFn(returnValue) {
  return function (v) {
    console.log(v);
    return returnValue;
  };
}

/*
p1.
then(getLogAndReturnFn(p2)).
then(getLogAndReturnFn(p3)).
then(getLogAndReturnFn()).
catch(e => {
  console.error('error message =', e.message);
});
*/

// This example shows a way to execute a series of promises in series
// instead of in parallel like Promise.all(promise-arr) does.

function runPromisesInSeries(promiseArr) {
  let p = promiseArr.shift();
  if (!p) return; // no more promises to process

  p.then(v => {
    console.log(v);
    runPromisesInSeries(promiseArr);
  }).catch(e => {
    console.error('error message =', e.message);
  });
}

//runPromisesInSeries([p1, p2, p3]);
