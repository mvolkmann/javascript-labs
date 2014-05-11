'use strict';

var rmv = {};

rmv.Shoe = function (brand, model, size) {
  // Inititialize object properties.
  this.brand = brand;
  this.model = model;
  this.size = size;

  // Update class property to track
  // number of objects created.
  rmv.Shoe.count += 1;
};

rmv.Shoe.count = 0; // initialize class property

// The toString method of an object is called automatically
// when an object is concatenated to a string.
rmv.Shoe.prototype.toString = function () {
  // The "this" keyword must be used to access instance properties.
  return this.brand + ' ' + this.model + ' in size ' + this.size;
};


// Allow shoes to be compared for equality.
rmv.Shoe.prototype.equals = function (obj) {
  return this.brand === obj.brand &&
    this.model === obj.model &&
    this.size === obj.size;
};

rmv.Shoe.createdAny = function () {
  return rmv.Shoe.count > 0;
};

var log = console.log;
var s1 = new rmv.Shoe('Mizuno', 'Precision 10', 13);
var s2 = new rmv.Shoe('Nike', 'Free 5', 12);
var s3 = new rmv.Shoe('Mizuno', 'Precision 10', 13);
log(rmv.Shoe.createdAny()); // true
log(rmv.Shoe.count); // 3
log(s2); // calls toString which returns "Nike Free 5 in size 12"

// Define a RunningShoe subclass of Shoe that adds
// type (neutral, stability, trail, ...) property,
// miles property and shouldReplace method.
rmv.RunningShoe = function (brand, model, size, type) {
  // Call Shoe constructor function on RunningShoe object.
  rmv.Shoe.call(this, brand, model, size);
  this.type = type;
  this.miles = 0;
};

//rmv.RunningShoe.prototype = new rmv.Shoe(); // IMPORTANT!
// This is an alternative to the previous line
// that avoids invoking the Shoe constructor.
rmv.RunningShoe.prototype = Object.create(rmv.Shoe.prototype); // IMPORTANT!

// This line is needed so the constructor of RunningShoe objects
// will be reported as RunningShoe instead of Shoe.
// See the last log call.
// But maybe that isn't important.
rmv.RunningShoe.prototype.constructor = rmv.RunningShoe;

rmv.RunningShoe.prototype.addMiles = function (miles) {
  this.miles += miles;
};

rmv.RunningShoe.prototype.shouldReplace = function () {
  return this.miles >= 500;
};

var rs = new rmv.RunningShoe(
  'Nike', 'Free Everyday', 13, 'lightweight trainer');
rs.addMiles(400);
log(rs.shouldReplace()); // false
rs.addMiles(200);
log(rs.shouldReplace()); // true
log('rs is a RunningShoe?', rs instanceof rmv.RunningShoe);
log('rs is a Shoe?', rs instanceof rmv.Shoe);
log('rs.constructor', rs.constructor);
