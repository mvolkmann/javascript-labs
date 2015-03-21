/*jshint esnext: true */
/*global Set: false */

let colors = new Set();
colors.add('red');
colors.add('green');
colors.add('blue');
colors.add('red');

// Another way to populate a Set
//let arr = ['red', 'green', 'blue', 'red'];
//let colors = new Set(arr);

console.log('colors.size =', colors.size);
console.log('has red =', colors.has('red'));
console.log('has pink =', colors.has('pink'));

console.log('\nkeys are:');
colors.forEach(key => console.log(key));

console.log('\nvalues are:');
for (let value of colors.values()) {
  console.log(value);
}
for (let value of colors) { // same
  console.log(value);
}

console.log('\nentries are:');
for (let [k, v] of colors.entries()) {
  console.log(k);
}

console.log('\ndeleting red');
colors.delete('red');
console.log('colors.size =', colors.size);
console.log('has red =', colors.has('red'));

let objs = new Set();
objs.add({color: 'red', size: 7});
objs.add({color: 'green', size: 8});
objs.add({color: 'blue', size: 9});
objs.forEach(key => console.log(key));
