'use strict';
/*jshint esnext: true */

var obj1 = {foo: 1, bar: 2, baz: 3};
var obj2 = {bar: 20, baz: 30, qux: 40};
Object.assign(obj2, obj1);
console.log('obj1 =', obj1);
console.log('obj2 =', obj2);
