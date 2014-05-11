var log = console.log;

var car;
log(car); // undefined
car = null;
log(car); // null
// Create an object using an object literal.
car = { make: 'Toyota', model: 'Prius', year: 2010 };

log(car.model); // Prius
log(car); // toString method in Object returns [object Object]

// Define a toString method as a property of the object.
// If car were created from a class, we'd add the method to its prototype.
// More on that later.
car.toString = function () {
  return this.year + ' ' + this.make + ' ' + this.model;
};
log(car); // 2010 Toyota Prius

car.model = 'RAV4'; // changes a property
log(car.model); // RAV4

var prop, type;
for (prop in car) {
  type = typeof car[prop];
  if (type !== 'function') { // avoiding toString function
    log(prop + ' = ' + car[prop] + '; a ' + type);
  }
}
// make is Toyota; a string
// model is RAV4; a string
// year is 2010; a number

if ('year' in car) log('has year'); // is output
if (car.year) log('has year'); // is output
delete car.year;
if (car.year) log('has year'); // is not output

var now = new Date();
if (car instanceof Date) log('car is a Date'); // is not output
if (now instanceof Date) log('now is a Date'); // is output

log(car.horsepower); // undefined
