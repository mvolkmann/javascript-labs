//'use strict';
/*jshint esnext: true */

// This works.
import {foo1, foo2} from './foo6.js';
console.log('in main');
console.log('foo1 =', foo1);
foo2();

// This works.
/*
import * as Foo from './foo6.js';
console.log('in main');
console.log('foo1 =', Foo.foo1);
Foo.foo2();
*/
