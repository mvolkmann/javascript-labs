'use strict';

function Vehicle(name, wheelCount) {
  this.name = name;
  if (wheelCount !== undefined) {
    this.wheelCount = wheelCount;
  }
}

Vehicle.prototype = {
  wheelCount: 4,
  toString: function () {
    return this.name + ' vehicle with ' + this.wheelCount + ' wheels';
  }
};

var car = new Vehicle('Prius');
console.log('car = ' + car);

var motorcycle = new Vehicle('Harley', 2);
console.log('motorcycle = ' + motorcycle);
