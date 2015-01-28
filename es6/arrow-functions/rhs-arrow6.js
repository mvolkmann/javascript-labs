'use strict';
/*jshint esnext: true */

// This shows that the RHS of an arrow function can be another arrow function
// which allows an arrow function to return an arrow function.
let foo = n => () => n * 2;

console.log('result =', foo(3)());
