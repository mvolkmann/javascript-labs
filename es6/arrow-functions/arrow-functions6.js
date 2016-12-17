'use strict';
/*jshint esnext: true */

const arr = [1, 2, 3, 4];
const doubled = arr.map(x => x * 2);
console.log(doubled);

const product = (a, b) => a * b;
console.log('name of function is', product.name); // product
console.log(product(2, 3));

const average = numbers => {
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};
console.log(average(arr));

const getObj = () => ({foo: 1, bar: 2});
console.log(getObj());
