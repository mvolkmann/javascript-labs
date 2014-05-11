'use strict';
/*jshint esnext: true */
/*global Symbol: false */

const arr = [1, 2, 3];
for (let v of arr) {
  console.log(v);
}

var iterSym = Symbol.iterator || '@@iterator'; // the former in Traceur
let iterMethod = arr[iterSym];
console.log('iterMethod =', iterMethod);

var iter = iterMethod.call(arr);
for (let v of iter) {
  console.log(v);
}

// TODO: Can you use this to create a custom class that is iterable?
