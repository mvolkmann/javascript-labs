'use strict';
/*jshint esnext: true */
/*global Symbol: false */

const arr = [1, 2, 3];
for (let v of arr) {
  console.log(v);
}

// Get array method that returns an iterator for its values.
let values = arr[Symbol.iterator];
console.log('values =', values);

// Get the iterator using this array method.
var iter = values.call(arr);
console.log('iter =', iter);

// Use an explicit iterator.
for (let v of iter) {
  console.log(v);
}
