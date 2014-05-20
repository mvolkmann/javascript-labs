var obj = {};
Object.defineProperties(obj, {
  foo: {writable: true, value: 1},
  bar: {enumerable: true, writable: true, value: 2}
});

for (var prop in obj) {
  console.log('for sees', prop, '=', obj[prop]); // only bar
}

Object.keys(obj).forEach(function (prop) {
  console.log('keys sees', prop, '=', obj[prop]); // only bar
});

console.log('all props =', Object.getOwnPropertyNames(obj)); // ['foo', 'bar']
