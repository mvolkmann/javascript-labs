/*jshint esnext: true */

let sizeProp = Symbol();

class Shoe {
  get size() {
    console.log('in getter for size');
    //return this._size;
    return this[sizeProp];
  }
  set size(size) {
    console.log('in setter for size');
    //this._size = size;
    this[sizeProp] = size;
  }
}

let s = new Shoe();
s.size = 13; // invokes setter
console.log('size =', s.size); // invokes getter
console.log('s =', s);
