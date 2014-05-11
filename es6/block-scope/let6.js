'use strict';
/*jshint esnext: true */

const a = 1;
if (a > 0) {
  let b = 2;
  console.log('a in block =', a);
  console.log('b in block =', b);
}
console.log('a out of block =', a);
a = 3; // jshint catches this
console.log('after change, a =', a);
console.log('b out of block =', b);
console.log('at end');
