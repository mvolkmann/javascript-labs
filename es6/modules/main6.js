'use strict';
/*jshint esnext: true */

/* This works.
import {foo1, foo2} from './foo6';
console.log('in main');
console.log('foo1 =', foo1);
foo2();
*/

// This works.
module Foo from './foo6';
console.log('foo1 =', Foo.foo1);
Foo.foo2();
//console.log('fooGlobalVar =', fooGlobalVar);
//fooGlobalFn();

// This import doesn't work!
/*
import obj from './foo6';
console.log('foo1 =', obj.foo1);
obj.foo2();
*/
