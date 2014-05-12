'use strict';
/*global window: false */

function add(n1, n2) {
  return n1 + n2;
}

function foo() {
  console.log('foo entered');
}

// exports is only defined when running from Node.js
if (typeof exports !== 'undefined') exports.add = add;
