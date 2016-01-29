'use strict';
/*jshint esnext: true */

let arr1 = [1, 2];
let arr2 = [3, 4];
arr1.push(...arr2);
console.log(arr1);

const dateParts = [1961, 3, 16];
const birthday = new Date(...dateParts);
console.log(birthday.toDateString());

arr1 = ['bar', 'baz'];
arr2 = ['foo', ...arr1, 'qux'];
console.log(arr2); // ['foo', 'bar', 'baz', ‘qux']

//arr1 = [...arr1, 'qux', 'foo'];
// equivalent to arr1 = arr1.concat('qux', 'foo');
//arr1 = arr1.concat('qux', 'foo');
arr1.push('qux', 'foo');
console.log(arr1); // ['bar', 'baz', ‘qux', 'foo']
