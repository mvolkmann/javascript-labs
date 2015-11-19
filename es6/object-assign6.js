'use strict';
/*jshint esnext: true */

let obj1 = {foo: 1, bar: 2, baz: 3};
let obj2 = {bar: 20, baz: 30, qux: 40};
Object.assign(obj2, obj1);
console.log('obj1 =', obj1);
console.log('obj2 =', obj2);

// Is it deep?
let obj = {a: {b: {b2: 2, c: 1}, a2: 2}};
console.log('obj =', obj);
let newObj = Object.assign({}, obj, {a: {b: {c: 2}}});
console.log('newObj =', newObj);
// No, Object.assign replaces top-level properties,
// so the "a" property is completely replaced.
