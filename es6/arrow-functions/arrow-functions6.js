'use strict';
/*jshint esnext: true */

let arr = [1, 2, 3, 4];
let doubled = arr.map(x => x * 2);
console.log(doubled);

let product = (a, b) => a * b;
console.log(product(2, 3));

let average = numbers => {
  let sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};
console.log(average(arr));

let getObj = () => ({foo: 1, bar: 2});
console.log(getObj());
