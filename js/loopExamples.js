'use strict';

var log = console.log;

var rmv = {};
rmv.colors = 'red,green,blue'.split(',');

for (var i = 0; i < rmv.colors.length; i++) { log(rmv.colors[i]); }

for (i in rmv.colors) { log(rmv.colors[i]); }

// ECMAScript 5 style
rmv.colors.forEach(function (color) { log(color); });

// The Array map method passes each element,
// its index and the entire array to the callback,
// so the following doesn't produce the desired output.
//rmv.colors.map(log);

i = 10;

while (i > 0) { log(i); i -= 2; } // 10, 8, 6, 4, 2

do { log(i); i += 3; } while (i <= 10); // 0, 3, 6, 9
