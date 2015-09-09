'use strict';
/*jshint esnext: true*/

// Skips the first n values of an iterator and yields the rest.
function* skip(iterator, n) {
  // Skip the first n values.
  for (let i = 0; i < n; i++) {
    let obj = iterator.next();
    if (obj.done) return;
  }

  // Yield the rest of the values.
  for (let value of iterator) {
    yield value;
  }
}

// Yields the first n values of an iterator.
function* take(iterator, n) {
  while (n > 0) {
    yield iterator.next();
    n--;
  }
}

function* fib() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

// Could use a takeWhile generator for this.
const gen = fib();
for (let value of gen) {
  if (value > 100) break;
  //if (value > 100) gen.return(); // another way to stop iteration
  console.log(value);
}

let fibObj = {
  * [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
};

console.log('first time using fibObj');
for (const n of fibObj) {
  if (n > 100) break;
  console.log(n);
}

console.log('second time using fibObj');
// This works!
for (const n of fibObj) {
  if (n > 100) break;
  console.log(n);
}

let arr = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Get iterator from array.
let iter = arr.values();
for (let result of take(skip(iter, 3), 5)) {
  console.log(result.value);
}

// With destructoring ...
for (let {value} of take(skip(fib(), 3), 5)) {
  console.log(value);
}
