'use strict';
/*jshint esnext: true */

function Cat() {}

function Dog() {}

let animal = new Cat();
console.log('before, is a Cat?', animal instanceof Cat);
console.log('before, is a Dog?', animal instanceof Dog);

Object.setPrototypeOf(animal, new Dog());
console.log('after, is a Cat?', animal instanceof Cat);
console.log('after, is a Dog?', animal instanceof Dog);
