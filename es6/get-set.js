/*jshint esnext: true */

let sizeProp = Symbol();

class Shoe {
  get size() {
    console.log('in getter for size');
    return this.size;
    //return this._size;
    //return this[sizeProp];
  }
  set size(size) {
    console.log('in setter for size');
    this.size = size;
    //this._size = size;
    //this[sizeProp] = size;
  }
}

let s = new Shoe();
s.size = 13; // invokes setter
console.log('size =', s.size); // invokes getter
console.log('s =', s);

let nameProp = Symbol();

class Person {
  constructor(name) {
    this[nameProp] = name;
  }

  get name() {
    return this[nameProp];
  }
}

let p = new Person('Mark');
console.log('name is', p.name);
p.name = 'Jason';
