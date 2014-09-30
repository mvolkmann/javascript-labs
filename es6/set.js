import 'traceur-runtime';

var arr = ['red', 'green', 'blue', 'red'];
for (var item of arr) {
  console.log(item);
}

//var colors = new Set(arr);
var colors = new Set();
colors.add('red');
colors.add('green');
colors.add('blue');
colors.add('red');
console.log('colors.size =', colors.size);
console.log('has red =', colors.has('red'));
console.log('has pink =', colors.has('pink'));

console.log('\nset contains:');
//colors.forEach(console.log);
for (let color of colors.values()) {
  console.log(color);
}

console.log('colors =', colors);
console.log('colors.keys() =', colors.keys());
console.log('colors.values() =', colors.values());
console.log('colors.entries() =', colors.entries());

console.log('\ndeleting red');
colors.delete('red');
console.log('colors.size =', colors.size);
console.log('has red =', colors.has('red'));

/*
for (let color of colors.values()) {
  console.log(color);
}
*/

//var colors = Set(arr);
