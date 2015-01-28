'use strict';
/*jshint esnext: true */

let a = [1, 2, 3];
let b = [4, 5, 6]
const seq = (for (x of a) for (y of b) x * y);
for (let z of seq) {
  console.log(z);
}
