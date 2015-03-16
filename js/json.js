function Address(street, city, state, zip) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

function Person(name, address) {
  this.name = name;
  this.address = address;
}

var a = new Address(
  '644 Glen Summit', 'St. Charles', 'MO', 63304);
var p = new Person('Mark', a);
var json = JSON.stringify(p);
console.log(json);
var newP = JSON.parse(json);
console.log(newP.name + ' ' + newP.address.zip);// Mark 63304
console.log(newP.constructor.name);
