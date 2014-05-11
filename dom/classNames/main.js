'use strict';

window.onload = function () {
  var ctor, elem;

  elem = document.getElementById('title');
  ctor = elem.constructor;
  console.log('constructor 1 =', ctor);
  ctor = ctor.prototype.constructor;
  console.log('constructor 2 =', ctor);
  ctor = ctor.prototype.constructor;
  console.log('constructor 3 =', ctor);
  ctor = ctor.prototype.constructor;
  console.log('constructor 4 =', ctor);
};
