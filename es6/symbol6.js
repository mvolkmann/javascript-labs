'use strict';
/*jshint esnext: true */
/*global Symbol: false */

// Note that the "new" keyword is not used to create a symbol,
// but JSHint doesn't like it.
let foo = Symbol('some description'); // note "new" keyword not used
console.log('foo =', foo.toString());
console.log('typeof foo =', typeof foo); // "symbol"
//console.log('foo.toString() =', foo.toString()); // "Symbol(some description)"

console.log('foo.constructor =', foo.constructor);
console.log('foo is a Symbol?', foo instanceof Symbol); // false in Traceur

// Symbols have no properties.
for (let prop in foo) {
  console.log(prop, '=', foo[prop]);
}

let bar = Symbol();

let map = {};
map[foo] = 'alpha';
map[bar] = 'beta';
map.baz = 'gamma';

let keys = Object.keys(map);
console.log('keys.length =', keys.length);
// Can't iterate over symbol keys.  Why?
keys.forEach(function (key) {
  console.log('map value for key', key, '=', map[key]);
});
console.log('map properties =', Object.getOwnPropertyNames(map));

console.log('map[foo] =', map[foo]);
console.log('map[bar] =', map[bar]);

// This demonstates use of global symbols.
let gs1 = Symbol.for('demo');
let gs2 = Symbol.for('demo');
console.log(gs1 === gs2 ? 'success' : 'failure');
console.log(Symbol.keyFor(gs1));

// This demonstates use of the well-known symbol "toStringTag.
class Weather {
  constructor(temperature) {
    this.temperature = temperature;
  }
  get [Symbol.toStringTag]() {
    let t = this.temperature;
    return t < 30 ? 'cold' : t > 80 ? 'hot' : 'comfortable';
  }
}
let w = new Weather(81);
console.log(w);
console.log('' + w)
console.log(Object.prototype.toString.call(w));
