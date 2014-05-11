'use strict';

var obj = {};
(function () {
  var t;
  Object.defineProperty(obj, 'temperature', {
    get: function () { return t; },
    set: function (value) {
      if (value > 100) throw 'too hot';
      t = value;
    }
  });
})();

console.log('obj.temperature =', obj.temperature); // undefined
obj.temperature = 100;
console.log('obj.temperature =', obj.temperature); // 100

Object.defineProperty(obj, 'temperature2', {
  value: 98.2,
  writable: true
});
console.log('obj.temperature2 =', obj.temperature2);
obj.temperature2 = 100;
console.log('obj.temperature2 =', obj.temperature2);

var person = {};
(function () {
  var age;

  Object.defineProperties(person, {
    name: {
      value: "Mark Volkmann",
      configurable: false, // can't delete
      writable: false // can't change
    },
    age: {
      get: function () { return age; },
      set: function (value) {
        if (value < 0 || value > 110) {
          throw new RangeError('age must be between 0 and 110');
        }
        age = value;
      }
    }
  });
})();

console.log('age =', person.age);
person.age = 52;
console.log('age =', person.age);

var obj = {foo: 'bar'};
var pd = Object.getOwnPropertyDescriptor(obj, 'foo');
console.log('pd =', pd);
