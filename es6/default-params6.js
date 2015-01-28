'use strict';
/*jshint esnext: true */

let today = new Date();

function makeDate(day, month = today.getMonth(), year = today.getFullYear()) {
  return new Date(year, month, day).toDateString();
}

console.log(makeDate(16, 3, 1961));
console.log(makeDate(16, 3));
console.log(makeDate(16));
