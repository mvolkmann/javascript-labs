'use strict';
/*jshint esnext: true */

function* myGen() {
  try {
    yield 'foo';
    yield 'bar';
    return 'baz';
  } catch (e) {
    console.error('caught', e);
    yield 'keep going';
  }
}

let gen = myGen();
// Must call next at least once before calling throw.
console.log(gen.next());
console.log(gen.throw(new Error('please stop')));
//console.log(gen.return('use this'));
console.log(gen.next());
console.log(gen.next());
