'use strict';
/*jshint esnext: true */

function* myGen() {
  try {
    yield 'foo';
  } catch (e) {
    console.error('caught', e);
  }
}

let gen = myGen();
// Must call next at least once before calling throw.
console.log(gen.next());
gen.throw('bar');
