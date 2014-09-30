'use strict';
/*jshint esnext: true */
/*global Symbol: false */

// Note that the "new" keyword is not used to create a symbol,
// but JSHint doesn't like it.
var foo = Symbol('some description'); // note "new" keyword not used
console.log('foo =', foo);
console.log('foo.toString() =', foo.toString()); // "Symbol(some description)"

console.log('foo.constructor =', foo.constructor);
console.log('foo is a Symbol?', foo instanceof Symbol); // false in Traceur

// Symbols have no properties.
for (var prop in foo) {
  console.log(prop, '=', foo[prop]);
}

var bar = Symbol();

var map = {};
map[foo] = 'alpha';
map[bar] = 'beta';
map.baz = 'gamma';

var keys = Object.keys(map);
console.log('keys.length =', keys.length);
// Can't iterate over symbol keys.  Why?
keys.forEach(function (key) {
  console.log('map value for key', key, '=', map[key]);
});
console.log('map properties =', Object.getOwnPropertyNames(map));

console.log('map[foo] =', map[foo]);
console.log('map[bar] =', map[bar]);
