'use strict';
/*jshint esnext: true */

class Shoe {
  constructor(brand, model, size) {
    this.brand = brand;
    this.model = model;
    this.size = size;
    Shoe.count += 1;
  }

  //static let count = 0; DOESN'T WORK!

  static createdAny() {
    return Shoe.count > 0;
  }

  equals(obj) {
    return obj instanceof Shoe &&
      this.brand === obj.brand &&
      this.model === obj.model &&
      this.size === obj.size;
  }

  toString() {
    return this.brand + ' ' + this.model + ' in size ' + this.size;
  }

  foo() {
    console.log('Shoe foo method entered');
  }
}

Shoe.count = 0;

console.log('class6.js Shoe =', Shoe);
console.log('class6.js typeof Shoe =', typeof Shoe);

let s1 = new Shoe('Mizuno', 'Precision 10', 13);
let s2 = new Shoe('Nike', 'Free 5', 12);
let s3 = new Shoe('Mizuno', 'Precision 10', 13);
console.log('created any?', Shoe.createdAny()); // true
console.log('count =', Shoe.count); // 3
console.log('s2 = ' + s2);
console.log('s1.equals(s2) =', s1.equals(s2)); // false
console.log('s1.equals(s3) =', s1.equals(s3)); // true

class RunningShoe extends Shoe {
  constructor(brand, model, size, type) {
    super(brand, model, size);
    this.type = type;
    this.miles = 0;
  }

  addMiles(miles) { this.miles += miles; }

  shouldReplace() { return this.miles >= 500; }

  foo() {
    super.foo();
    console.log('RunningShoe foo method entered');
  }
}

let rs = new RunningShoe(
  'Nike', 'Free Everyday', 13, 'lightweight trainer');
rs.addMiles(400);
console.log('should replace?', rs.shouldReplace()); // false
rs.addMiles(200);
console.log('should replace?', rs.shouldReplace()); // true
console.log('rs is a RunningShoe?', rs instanceof RunningShoe);
console.log('rs is a Shoe?', rs instanceof Shoe);
rs.foo();
