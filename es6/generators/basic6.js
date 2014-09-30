'use strict';
/*jshint esnext: true */

function* gen1() {
  yield 'foo';
  yield 'bar';
  yield 'baz';
}

for (let value of gen1()) {
  console.log(value);
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

var iter = gen2(1);
var result = iter.next(); // can't pass data in first call to next
console.log(result.value); // foo1

result = iter.next(2);
console.log(result.value); // bar2

//iter.throw('stop now');

result = iter.next(3);
console.log(result.done ? 'done' : result.value); // baz3

result = iter.next(4);
console.log(result.done ? 'done' : result.value); // done
