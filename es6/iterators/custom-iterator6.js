'use strict';
/*jshint esnext: true */
/*global Symbol: false */

let arr = [1, 2, 3, 5, 6, 8, 11];
let isOdd = n => n % 2 === 1;

// This is less efficient than using an iterator because
// the Array filter method builds a new array and
// iteration cannot begin until that completes.
arr.filter(isOdd).forEach((n) => console.log(n));

// This is more efficient than the approach above.

function getFilterIterator(arr, filter) {
  let index = 0;
  return {
    [Symbol.iterator]: () => ({
      next() {
        while (true) {
          if (index >= arr.length) return {done: true};
          let value = arr[index++];
          if (filter(value)) return {value};
        }
      }
    })
  };
}

for (let v of getFilterIterator(arr, isOdd)) {
  console.log(v);
}

// Here is another way to implement the same iterator.
// It uses a class, but is a bit more verbose.
class FilterIterator {
  constructor(arr, filter) {
    this.arr = arr;
    this.filter = filter;
  }

  [Symbol.iterator]() {
    let arr = this.arr;
    let filter = this.filter;
    let index = 0;
    return {
      next() {
        while (true) {
          if (index >= arr.length) return {done: true};
          let value = arr[index++];
          if (filter(value)) return {value};
        }
      }
    };
  }
}

for (let v of new FilterIterator(arr, isOdd)) {
  console.log(v);
}
