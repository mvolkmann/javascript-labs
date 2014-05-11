'use strict';
/*jshint esnext: true */

var arr1 = [1, 2];
var arr2 = [3, 4];
arr1.push(...arr2);
console.log(arr1);

var dateParts = [1961, 3, 16];
var birthday = new Date(...dateParts);
console.log(birthday.toDateString());
