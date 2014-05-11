'use strict';
/*jshint esnext: true */

class Shoe {
  constructor(brand, model, size) {
    this.brand = brand;
    this.model = model;
    this.size = size;
    Shoe.count += 1;
  }

  static var count2 = 0;

  equals(obj) {
    return obj instanceof Shoe &&
      this.brand === obj.brand &&
      this.model === obj.model &&
      this.size === obj.size;
  }

  toString() {
    return this.brand + ' ' + this.model + ' in size ' + this.size;
  }
}

Shoe.count = 0;
Shoe.createdAny = () => Shoe.count > 0;

var s1 = new Shoe('Mizuno', 'Precision 10', 13);
var s2 = new Shoe('Nike', 'Free 5', 12);
var s3 = new Shoe('Mizuno', 'Precision 10', 13);
console.log('created any?', Shoe.createdAny()); // true
console.log('count =', Shoe.count); // 3
console.log('s2 = ' + s2);
console.log('s1.equals(s2) =', s1.equals(s2)); // false
console.log('s3.equals(s3) =', s3.equals(s3)); // true

class RunningShoe extends Shoe {
  constructor(brand, model, size, type) {
    super(brand, model, size);
    this.type = type;
    this.miles = 0;
  }

  addMiles(miles) { this.miles += miles; }

  shouldReplace() { return this.miles >= 500; }
}

var rs = new RunningShoe(
  'Nike', 'Free Everyday', 13, 'lightweight trainer');
rs.addMiles(400);
console.log('should replace?', rs.shouldReplace()); // false
rs.addMiles(200);
console.log('should replace?', rs.shouldReplace()); // true
console.log('rs is a RunningShoe?', rs instanceof RunningShoe);
console.log('rs is a Shoe?', rs instanceof Shoe);
