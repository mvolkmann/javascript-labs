'use strict';
/*jshint esnext: true */

class Shoe {
  get size() {
    console.log('in getter for size');
    return Reflect.get(this, 'size');
  }
  set size(size) {
    console.log('in setter for size');
    Reflect.set(this, 'size', size);
  }
}

let s = new Shoe();
s.size = 13; // invokes setter
console.log(s.size); // invokes getter
