'use strict';
/*jshint esnext: true */

let obj = {};

// Traceur/Node doesn't have observe method yet!
Object.observe(obj, function (recs) {
  console.log('recs =', recs);
});

obj.foo = 'bar';
