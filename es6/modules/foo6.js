'use strict';
/*jshint esnext: true */

import * as blah from './bar6';
import {bar1, bar2} from './bar6';

export let foo1 = 'the value of foo1';
console.log('foo6: bar1 =', bar1);

export function foo2() {
  console.log('in foo2');
  bar2();
}

let obj = {
  foo1: 'the value of foo1',
  foo2: function () {
    console.log('in foo2');
    bar2();
  }
};

// The next statement doesn't work in Traceur.
//export default = obj;

let fooGlobalVar = 1;
function fooGlobalFn() {
  console.log('in fooGlobalFn');
}
