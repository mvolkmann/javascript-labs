'use strict';

function assert(condition) {
  if (!condition) console.log('assertion failed');
}

var d = new Date();
assert(d.constructor === Date);
assert(Date.prototype.isPrototypeOf(d));
assert(Object.prototype.isPrototypeOf(d));
//assert(d.constructor.prototype.constructor === Object);
console.log(d.constructor.prototype.constructor.prototype.constructor.prototype);

var obj = {foo: 'bar'};
assert(obj.constructor === Object);
assert(Object.prototype.isPrototypeOf(obj));
console.log(obj.constructor.prototype);
console.log(obj.constructor.prototype.constructor.prototype);
console.log(obj.constructor.prototype.constructor.prototype.constructor.prototype);
