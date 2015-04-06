'use strict';
/*jshint esnext: true */
/*global Promise: false */

let reject, resolve; // to make JSHint happy

function double(n) {
  return new Promise(resolve => resolve(n * 2));
}

function triple(n) {
  return new Promise(resolve => resolve(n * 3));
}

function quadruple(n) {
  return new Promise(resolve => resolve(n * 4));
}

function badOp(n) {
  return new Promise((resolve, reject) => reject('I failed!'));
}

// The magic!
// This obtains and waits for each of the promises
// that are yielded by the specified generator function.
// It is a utility method that would only be written once.
function async(generatorFn) {
  let gen = generatorFn();
  function success(result) {
    let next = gen.next(result);
    // next.value is a promise
    // next.done will be false when gen.next is called
    // after the last yield in workflow has run.
    if (!next.done) next.value.then(success, failure);
  }
  function failure(err) {
    let next = gen.throw(err);
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
  let n = 1;
  try {
    n = yield double(n);
    n = yield triple(n);
    //n = yield badOp(n);
    n = yield quadruple(n);
    console.log('n =', n); // 24
  } catch (e) {
    // To see this happen, uncomment yield of badOp.
    console.error('error:', e);
  }
});
