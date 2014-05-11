'use strict';

function dumpMethodNames(name, obj) {
  var prop, value;
  for (prop in obj) {
    value = obj[prop];
    if (typeof value === 'function') {
      console.log(name, 'has method', prop);
    }
  }
}

// Allocate space.
// ArrayBuffer is a fixed-length, binary data buffer.
var buf = new ArrayBuffer(8 * 10);
dumpMethodNames('ArrayBuffer', buf);

// A view must be created to read and write data in the buffer.
// Multiple views can be created that look at
// different ranges of the same buffer.
// Create a view into the space.
var arr = new Uint8Array(buf);
dumpMethodNames('Uint8Array', arr);

// Add data.
arr[0] = 19;
arr[1] = 7;
arr.set(2, 11);
arr.set(3, 21);

// Retrieve data.
for (var i = 0; i < 4; i++) {
  console.log(arr[i], arr.get(i));
}

//console.log('arr.slice(1, 2) =', arr.slice(1, 2));

var buf2 = new ArrayBuffer(16 * 10);
var view1 = new Uint32Array(buf2);
var bytes = view1.BYTES_PER_ELEMENT;
console.log('bytes =', bytes);
view1[3] = 1234567890;
var view2 = new Uint32Array(buf2, bytes * 3, bytes * 2);
console.log('view2[0] =', view2[0]);
console.log('view2.length =', view2.length);
//console.log('view2.buffer =', view2.buffer);
console.log('view2.buffer === buf', view2.buffer === buf);
console.log('view2.byteOffset =', view2.byteOffset);
console.log('view2.length =', view2.length);
