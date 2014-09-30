'use strict';
/*jshint esnext: true */
/*global Promise: false */

var reject, resolve; // to make JSHint happy

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function double(n) {
  await sleep(50);
  return n * 2;
}

function triple(n) {
  return new Promise(resolve => resolve(n * 3));
}

function quadruple(n) {
  return n * 4;
}

function badOp() {
  return new Promise((resolve, reject) => reject('I failed!'));
}

// Call multiple asynchronous function in series
// in a way that makes them appear to be synchronous.
// This avoids writing code in the pyramid of doom style.
async function work() {
  var n = 1;
  try {
    n = await double(n);
    n = await triple(n);
    //n = await badOp(n);
    n = await quadruple(n);
    console.log('n =', n);
  } catch (e) {
    // To see this happen, uncomment await of badOp.
    console.error('error:', e);
  }
}

work();
