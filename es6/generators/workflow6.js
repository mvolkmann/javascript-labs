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
    let obj = gen.next(result); // provides value returned by yield
    // obj.value is a promise
    // obj.done will be false when gen.next is called
    // after the last yield in workflow has run.
    if (!obj.done) obj.value.then(success, failure);
  }
  function failure(err) {
    let obj = gen.throw(err);
    // obj.value is a promise
    // obj.done will be false if the error was caught and handled.
    if (!obj.done) obj.value.then(success, failure);
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
