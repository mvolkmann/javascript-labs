import * as math from './math';
import stringUtil from './string-util';

console.log('main.js entered');

let name = 'Mark';
console.log(`Hello, ${name}!`);

console.log('sum =', math.sum(19, 6));
console.log('diff =', math.diff(19, 6));

console.log('cameled =', stringUtil.camel('foo bar baz'));
console.log('initials are', stringUtil.initials('Richard Mark Volkmann'));

// Signal to jspm that we are using ES6.
export default {};
