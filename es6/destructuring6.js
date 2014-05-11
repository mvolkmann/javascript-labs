'use strict';
/*jshint esnext: true */

// Swapping variable values simultaneously.
var a = 1, b = 2, c = 3;
var [a, b, c] = [b, c, a];
console.log('a =', a); // 2
console.log('b =', b); // 3
console.log('c =', c); // 1

// Function parameters.
function report([name, color]) {
  console.log(name + "'s favorite color is", color + '.');
} 
var data = ['Mark', 'yellow'];
report(data); // Mark's favorite color is yellow.

// Arrays
var arr = [1, [2, 3], [[4, 5], [6, 7, 8]]];
var [a, [, b], [[c], [,, d]]] = arr;
console.log('a =', a); // 1
console.log('b =', b); // 3
console.log('c =', c); // 4
console.log('d =', d); // 8

// Objects
var obj = {color: 'blue', weight: 1, size: 32};
// To set variables with the same names as the object properties.
var {color, size} = obj;
console.log('color =', color); // blue
console.log('size =', size); // 32
// To set variables the different names than the object properties.
var {color: c, size: s} = obj;
console.log('c =', c); // blue
console.log('s =', s); // 32

// Also works on arrays of objects
// and objects with array properties.
// Just mimic the structure on LHS.

function report2(p1, {weight, color}) {
  console.log(p1, color, weight);
}
report2(19, obj); // 19 'blue' 1

// Capture groups from a regular expression.
let dateStr = 'I was born on 4/16/1961 in St. Louis.';
let re = /(\d{1,2})\/(\d{1,2})\/(\d{4})/;
let [, month, day, year] = re.exec(dateStr);
console.log('date pieces =', month, day, year);
