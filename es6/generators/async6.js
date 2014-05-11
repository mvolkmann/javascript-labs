'use strict';
/*jshint esnext: true */
/*global Deferred: false */

// This mimics Node-style async functions that take arguments and
// a callback that will be passed an error description and a result.
function myAsyncFn(arg, cb) {
  if (arg === 'beta') throw 'bad arg';
  setTimeout(function () {
    let result = arg.toUpperCase();
    cb(null, result);
  }, 1000);
}

// Takes a Node-style async function and the arguments to be passed to it,
// excluding the callback, and returns a function that only takes the callback.
function wrapAsyncFn(fn, ...args) {
  return fn.bind(null, ...args);
}

function* myGenerator() {
  var result = yield wrapAsyncFn(myAsyncFn, 'alpha');
  console.log(result);
  result = yield wrapAsyncFn(myAsyncFn, 'beta');
  console.log(result);
}

// A resuable function that creates an instance of a generator
// and calls it repeatedly until it is "done".
function runGenerator(generatorFn) {
  let gen = generatorFn();

  function runNext(err, data) {
    console.log('runNext: data =', data);
    if (err) return gen.throw(err);
    let result = gen.next(data);
    if (!result.done) result.value(runNext);
  }

  runNext();
}

function gen2() {
  let gen = myGenerator();
  console.log('gen =', gen);
  console.log(gen.next().value());
  console.log(gen.next().value());
}

// Runs myAsyncFn inside a promise.
function myPromiseFn(arg) {
  let promise = new Promise((resolve, reject) => {
    myAsyncFn(arg, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
  return promise;
}

function callbackDemo() {
  myAsyncFn('alpha', function (err, result) {
    if (err) throw err;
    console.log(result);
    myAsyncFn('beta', function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}

function promiseDemo() {
  var result;
  await result = myPromiseFn('alpha');
  console.log(result);
  await result = myPromiseFn('beta');
  console.log(result);
}

//runGenerator(myGenerator);
//gen2();
//callbackDemo();
promiseDemo().catch(ex => {
  console.error('error:', ex);
});
/*
var result;
await result = myPromiseFn('alpha');
console.log(result);
await result = myPromiseFn('beta');
console.log(result);
*/
