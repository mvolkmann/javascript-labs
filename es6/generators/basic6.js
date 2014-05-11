'use strict';
/*jshint esnext: true */

function* myGen(start) {
  console.log('start =', start);
  var curr = start;
  var v = yield 'foo';
  console.log('v =', v);
  v = yield 'bar';
  console.log('v =', v);
  return 'baz';
}

var gen = myGen(0);
console.log('gen =', gen);
console.log('gen.constructor =', gen.constructor);
for (var prop in gen) {
  //console.log(prop, '=', gen[prop]);
  console.log('prop =', prop);
}

var result = gen.next(); // can't pass data in first call to next
console.log(result); // 1

result = gen.next(2);
console.log(result); // 2

//gen.throw('stop now');

result = gen.next(3);
console.log(result); // 3

if (!result.done) {
  console.log(gen.next(4)); // throws if result.done
}
