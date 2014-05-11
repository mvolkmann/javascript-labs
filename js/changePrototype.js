'use strict';

function Foo() {
}
Foo.prototype.reportType = function () {
  console.log('I am a Foo.');
};

function Bar() {
}
Bar.prototype.reportType = function () {
  console.log('I am a Bar.');
};

var obj = new Foo();
console.log('before change, obj is a Foo?', obj instanceof Foo);
console.log('before change, obj.constructor =', obj.constructor);
obj.reportType();

obj.constructor = Bar;
console.log('after change, obj is a Foo?', obj instanceof Foo);
console.log('after change, obj is a Bar?', obj instanceof Bar);
console.log('after change, obj.constructor =', obj.constructor);
obj.reportType();

obj.__proto__ = new Bar(); // deprecated
obj.reportType();
