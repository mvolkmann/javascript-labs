'use strict';

var rmv = {
  shoeCount: 0,
  createdAnyShoes: function () {
    return rmv.shoeCount > 0;
  }
};

rmv.shoeProto = {
  // The toString method of an object is called automatically
  // when an object is concatenated to a string.
  toString: function () {
    console.log('in shoeProto.toString');
    // The "this" keyword must be used to access instance properties.
    return this.brand + ' ' + this.model + ' in size ' + this.size;
  },
  // Allow shoes to be compared for equality.
  equals: function (obj) {
    return this.brand === obj.brand &&
      this.model === obj.model &&
      this.size === obj.size;
  }
};

rmv.createShoe = function (brand, model, size) {
  var shoe = Object.create(rmv.shoeProto, {
    brand: {value: brand},
    model: {value: model},
    size: {value: size}
  });

  // Update class property to track
  // number of objects created.
  rmv.shoeCount += 1;

  return shoe;
};

var log = console.log;
var s1 = rmv.createShoe('Mizuno', 'Precision 10', 13);
var s2 = rmv.createShoe('Nike', 'Free 5', 12);
var s3 = rmv.createShoe('Mizuno', 'Precision 10', 13);
log(rmv.createdAnyShoes()); // true
log(rmv.shoeCount); // 3
log(s2.toString()); // calls toString which returns "Nike Free 5 in size 12"

var runningShoeProto = {
  addMiles: function (miles) { this.miles += miles; },
  shouldReplace: function () {
    return this.miles >= 500;
  }
};

// Define a RunningShoe subclass of Shoe that adds
// type (neutral, stability, trail, ...) property,
// miles property and shouldReplace method.
// In this version, running shoe doesn't really inherit from shoe!
rmv.createRunningShoe = function (brand, model, size, type) {
  return Object.create(runningShoeProto, {
    brand: {value: brand},
    model: {value: model},
    size: {value: size},
    type: {value: type},
    miles: {value: 0, writable: true}
  });
};

var rs = rmv.createRunningShoe(
  'Nike', 'Free Everyday', 13, 'lightweight trainer');
rs.addMiles(400);
log(rs.shouldReplace()); // false
rs.addMiles(200);
log(rs.shouldReplace()); // true

// In this version there are no constructor functions
// that can be used to test the type!
//log('rs is a RunningShoe?', rs instanceof rmv.RunningShoe);
//log('rs is a Shoe?', rs instanceof rmv.Shoe);
