'use strict';

function Cylinder(height, diameter) {
  this.height = height;
  this.diameter = diameter;
}

Cylinder.prototype.getVolume = function () {
  var radius = this.diameter / 2;
  return this.height * Math.PI * radius * radius;
};

var cyl = new Cylinder(4, 2);
// Output the volume of this cylinder with two decimal places.
console.log('volume =', cyl.getVolume().toFixed(2));
