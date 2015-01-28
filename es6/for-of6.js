'use strict';
/*jshint esnext: true */

let stooges = ['Moe', 'Larry', 'Curly'];
for (let stooge of stooges) {
  console.log(stooge);
}
//console.log('stooge =', stooge); // jshint catches this

function forOf(obj, fn) {
  for (let value of obj) {
    fn(value);
  }
}

let obj = {
  foo: 1,
  bar: 2,
  baz: 3
}
for (let value of obj) {
  console.log(value);
}
//forOf(obj, console.log);
