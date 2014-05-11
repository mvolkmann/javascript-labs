'use strict';

var d = new Date(2013, 3, 16);
console.log(d.toDateString());
// Add three weeks.
d.setDate(d.getDate() + 3 * 7);
console.log(d.toDateString());
