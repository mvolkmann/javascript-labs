'use strict';

var makeCar = function (make, model, year) {
  return Object.create(null, {
    'make': {
      value: make,
      enumerable: true, // can find in looping
      writable: true // can modify
    },
    'model': {
      value: model,
      configurable: true // can delete
    },
    'year': {
      value: year
    }
  });
};

var car = makeCar("Saturn", "Sky Redline", 2007);

var pd = Object.getOwnPropertyDescriptor(car, 'make');
console.log('make descriptor properties:');
Object.keys(pd).forEach(function (key) {
  console.log('  ' + key + ' = ' + pd[key]);
});

car.make = 'Pontiac'; // TypeError if in strict mode and writable is false
delete car.model; // TypeError if in strict mode and configurable is false
if (car.model !== undefined) console.log('failed to delete model property');

// Output all enumerable properties of the car object.
Object.keys(car).forEach(function (key) {
  console.log(key + ' = ' + car[key]);
});
