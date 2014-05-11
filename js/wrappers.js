'use strict';

var n = new Number(19); // converts arg to primitive number
console.log(n); // {}
console.log(typeof n); // 'object'
console.log(n.valueOf()); // 19

var n = Number(19); // converts arg to primitive number
console.log(n); // '19'
console.log(typeof n); // 'number'
// similar for Boolean and String
