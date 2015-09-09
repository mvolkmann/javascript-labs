'use strict';
/*jshint esnext: true */

let stooges = ['Moe', 'Larry', 'Curly'];
for (let stooge of stooges) {
  console.log(stooge);
}
//console.log('stooge =', stooge); // jshint catches this

for (let [index, stooge] of stooges.entries()) {
  console.log(index, stooge);
}

let iterable = {
  data: [1, 2, 3],
  index: 0,
  [Symbol.iterator]() {
    console.log('Symbol.iterator method called');
    return this;
  },
  next() {
    console.log('next method called');
    return this.index < this.data.length ?
      {value: this.data[this.index++]} :
      {done: true};
  }
};

console.log('iterable has Symbol.iterator method?', Symbol.iterator in iterable);

//for (let v of iterable) console.log(v);

let iterator = {
  data: [1, 2, 3],
  index: 0,
  next() {
    console.log('next method called');
    return this.index < this.data.length ?
      {value: this.data[this.index++]} :
      {done: true};
  }
};

//let iterator = iterable[Symbol.iterator]();
//for (let v of iterator) console.log(v);

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
console.log('gen() has Symbol.iterator method?', Symbol.iterator in gen());
console.log('gen() has next method?', 'next' in gen());
for (let v of gen()) console.log(v);
