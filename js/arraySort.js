'use strict';

var log = console.log;

var a = [7, 19, 3, 10];

log(a.sort()); // alphabetical -> 10,19,3,7

log(a.sort(function (l, r) {
  return l - r;
})); // numeric ascending -> 3,7,10,19

log(a.sort(function (l, r) {
  return r - l;
})); // numeric decending -> 19,10,7,3

String.compareTo = function (s1, s2) {
  return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
};

var Car = function (make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
};

Car.prototype.toString = function () {
  return this.year + ' ' + this.make + ' ' + this.model;
};

// Sort first on year, then make, then model.
Car.prototype.compareTo = function (obj) {
  return !(obj instanceof Car) ? 0 :
    this.year !== obj.year ? this.year - obj.year :
    //this.make !== obj.make ? String.compareTo(this.make, obj.make) :
    this.make !== obj.make ? this.make.localeCompare(obj.make) :
    //String.compareTo(this.model, obj.model);
    this.model.localeCompare(obj.model);
};

Car.compare = function (car1, car2) {
  return car1.compareTo(car2);
};

var cars = [];
cars.push(new Car('Toyota', 'Prius', 2010));
cars.push(new Car('Toyota', 'Corolla', 2010));
cars.push(new Car('Toyota', 'Prius', 2007));
log(cars.sort(Car.compare));
