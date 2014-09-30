'use strict';
/*jshint esnext: true */
/*global Symbol: false */

var arr = [1, 2, 3, 5, 6, 8, 11];
var isOdd = n => n % 2 === 1;

// This is less efficient than using an iterator because
// the Array filter method builds a new array and
// iteration cannot begin until that completes.
arr.filter(isOdd).forEach((n) => console.log(n));

// This is more efficient than the approach above.

function getFilterIterator(arr, filter) {
  var index = 0, result = {done: false};
  return {
    [Symbol.iterator]: () => ({
      next() {
        while (true) {
          if (index >= arr.length) return {done: true};
          result.value = arr[index++];
          if (filter(result.value)) return result;
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
    var index = 0;
    return {
      next() {
        while (true) {
          if (index >= arr.length) return {done: true};
          var value = arr[index++];
          if (filter(value)) return {value: value, done: false};
        }
      }
    };
  }
}

for (let v of new FilterIterator(arr, isOdd)) {
  console.log(v);
}
