'use strict';
/*jshint esnext: true */
/*global Symbol: false */

var foo = Symbol('some description');
console.log('foo =', foo);
console.log('foo.name =', foo.name);
// should be "some description", but not set in Traceur

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
