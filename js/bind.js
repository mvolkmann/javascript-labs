'use strict';

function add(a, b) {
  return a + b;
}

const add5 = add.bind(null, 5);

console.log(add5(10)); // 15

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

const r1 = new Rectangle(2, 3);
const r2 = new Rectangle(3, 4);

const getArea = r1.getArea.bind(r2);
console.log(getArea()); // 12
