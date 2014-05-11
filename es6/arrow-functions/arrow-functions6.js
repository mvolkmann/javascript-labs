'use strict';
/*jshint esnext: true */

var arr = [1, 2, 3, 4];
var doubled = arr.map(x => x * 2);
console.log(doubled);

var product = (a, b) => a * b;
console.log(product(2, 3));

var average = numbers => {
  var sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};
console.log(average(arr));

var getObj = () => ({foo: 1, bar: 2});
console.log(getObj());
