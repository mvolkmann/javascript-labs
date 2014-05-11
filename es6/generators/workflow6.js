'use strict';
/*jshint esnext: true */
/*global Promise: false */

var reject, resolve; // to make JSHint happy

// Multiples a given number by 2 asynchronously.
function asyncThing1(n) {
  return new Promise((resolve) => resolve(n * 2));
}

// Multiples a given number by 3 asynchronously.
function asyncThing2(n) {
  return new Promise((resolve) => resolve(n * 3));
}

// Multiples a given number by 4 asynchronously.
function asyncThing3(n) {
  return new Promise((resolve) => resolve(n * 4));
}

function asyncThing4(n) {
  return new Promise((resolve, reject) => reject('blah'));
}

// The magic!
// This obtains and waits for each of the promises
// that are yielded by the specified generator function.
// This is a utility method that would only be written once.
function async(generatorFn) {
  var generator = generatorFn();
  function success(result) {
    var next = generator.next(result);
    // next.value is a promise
    // next.done will be false when generator.next is called
    // after the last yield in workflow has run.
    if (!next.done) next.value.then(success, failure);
  }
  function failure(err) {
    var next = generator.throw(err);
    // next.value is a promise
    // next.done will be false if the error was caught and handled.
    if (!next.done) next.value.then(success, failure);
  }
  success();
}

// This is the way you would write code that needs to
// run multiple asynchronous functions in series.
// It calls them in a way that makes them appear to be synchronous.
// It avoids writing code in the pyramid of doom style.
async(function* () {
  var n = 1;
  try {
    n = yield asyncThing1(n); // yields a promise
    n = yield asyncThing2(n); // yields a promise
    n = yield asyncThing3(n); // yields a promise
    //n = yield asyncThing4(n); // yields a promise
    console.log('n =', n);
  } catch (e) {
    // To see this happen, uncomment the call the asyncThing4 which rejects.
    console.error('error:', e);
  }
});
