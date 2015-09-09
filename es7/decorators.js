// Currently decorators can only be tested in Babel experimental mode.

/**
 * The current decorators proposal does not
 * support adding decorators to functions,
 * only classes and methods.

function fnDecorator(...args) {
  console.log('fnDecorator: args =', args);
}

@fnDecorator
function foo() {
  console.log('in foo');
}
foo();
*/

function classDecorator(...args) {
  console.log('decorator2: args =', args);
  return function (target) {
    console.log('decorator2: target =', target);
    target.test = 'just testing';
  };
}

function methodDecorator(target, key, descriptor) {
  console.log('target =', target);
  console.log('target.constructor =', target.constructor);
  console.log('key =', key);
  console.log('descriptor =', descriptor);
  //target[key](); // Why doesn't this work?
  // Can modify descriptor and return it.
  // Can override get and set for the property.
  descriptor.get = function () {
    console.log('in get');
  };
  return descriptor;
}

@classDecorator
class Foo {
  @methodDecorator
  fn1() {
    console.log('inside fn1');
  }
}

let foo = new Foo();
foo.fn1();
