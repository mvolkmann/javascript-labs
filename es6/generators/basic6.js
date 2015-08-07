'use strict';
/*jshint esnext: true */

function* myGenFn() {
  yield 1;
  yield 2;
  return 3;
}

let myGen = myGenFn();
console.log(myGen.next()); // {value: 1, done: false}
console.log(myGen.next()); // {value: 2, done: false}
console.log(myGen.next()); // {value: 3, done: true}
// Without return in myGenFn, last value is missing

for (let n of myGenFn()) {
  console.log(n); // 1, then 2, not 3
}

function* gen2(v) {
  try {
    v = yield 'foo' + v;
    v = yield 'bar' + v;
    yield 'baz' + v;
  } catch (e) {
    console.error('caught', e);
  }
}

let iter = gen2(1); // can pass value to generator function,
let result = iter.next(); // but can't pass in first call to next
console.log(result.value); // foo1

result = iter.next(2);
console.log(result.value); // bar2

//iter.throw('stop now');

result = iter.next(3);
console.log(result.done ? 'done' : result.value); // baz3

result = iter.next(4);
console.log(result.done ? 'done' : result.value); // done
