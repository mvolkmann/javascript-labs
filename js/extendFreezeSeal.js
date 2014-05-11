'use strict';

var obj = {foo: 1, bar: 2};

try {
  Object.preventExtensions(obj);
  obj.baz = 3; // TypeError: Can't add property baz, object is not extensible
} catch (e) {
  console.log(e);
} 

try {
  Object.seal(obj);
  delete obj.bar; // TypeError: Cannot delete property 'bar' of #<Object>
} catch (e) {
  console.log(e);
}

try {
  Object.freeze(obj);
  obj.foo = 3; // TypeError: Cannot assign to read only property 'foo' of #<Object>
} catch (e) {
  console.log(e);
}
