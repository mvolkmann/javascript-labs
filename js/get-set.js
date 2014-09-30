'use strict';

var people = ['Mark Volkmann', 'Brendan Eich'];
var index = 0;

var p = {
  get firstName() {
    var name = people[index];
    return name.split(' ')[0];
  },
  get lastName() {
    var name = people[index];
    return name.split(' ')[1];
  },
  set index(i) {
    index = i;
  }
}

console.log('firstName =', p.firstName);
console.log('lastName =', p.lastName);

p.index = 1;

console.log('firstName =', p.firstName);
console.log('lastName =', p.lastName);

console.log('index =', p.index); // undefined because no getter
//p.firstName = 'Richard'; // TypeError because no setter

console.log(Object.getOwnPropertyDescriptor(p, 'firstName'));
console.log(Object.getOwnPropertyDescriptor(p, 'index'));
