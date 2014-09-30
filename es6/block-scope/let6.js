'use strict';
/*jshint esnext: true */

const a = 1;
if (a > 0) {
  let b = 2;
  console.log('a in block =', a);
  console.log('b in block =', b);
}
console.log('a out of block =', a);
//a = 3; // Traceur flags w as read-only
console.log('b out of block =', b); // TODO: Why is this 2?
console.log('at end');
