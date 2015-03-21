let teams = new Map();
teams.set('Chicago', 'Cubs');
teams.set('Kansas City', 'Royals');
teams.set('St. Louis', 'Cardinals');

// Another way to populate a Map.
/*
let arr = [
  ['Chicago', 'Cubs'],
  ['Kansas City', 'Royals'],
  ['St. Louis', 'Cardinals']
];
let teams = new Map(arr);
*/

console.log('teams.size =', teams.size);
console.log('has St. Louis =', teams.has('St. Louis'));
console.log('has Los Angeles =', teams.has('Los Angeles'));
console.log('St. Louis', teams.get('St. Louis'));

console.log('\nkeys are:');
teams.forEach((value, key) => console.log(key));

// Another way to iterate over keys.
for (let key of teams.keys()) {
  console.log(key);
}

console.log('\nvalues are:');
for (let value of teams.values()) {
  console.log(value);
}

console.log('\nentries are:');
for (let entry of teams.entries()) {
  console.log(entry);
}
for (let [city, team] of teams) { // same
  console.log('The', team, 'plays in', city);
}

console.log('\ndeleting Chicago');
teams.delete('Chicago');
console.log('teams.size =', teams.size);
console.log('has Chicago =', teams.has('Chicago'));

let objs = new Map();
objs.set({color: 'red', size: 7}, [false, 1, 'alpha']);
objs.set({color: 'green', size: 8}, [true, 2, 'beta']);
objs.set({color: 'blue', size: 9}, [false, 3, 'gamma']);
objs.forEach((value, key) => console.log(key, '=', value));
