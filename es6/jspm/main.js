//import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import * as math from './math';
import * as strUtil from './str-util';
import $ from 'jquery';

let name = 'Mark';
console.log(`Hello, ${name}!`);

console.log('sum =', math.sum(19, 6));
console.log('diff =', math.diff(19, 6));

console.log('cameled =', strUtil.camel('foo bar baz'));

$('#get-initials-btn').click(() => {
  let name = $('#name-input').val();
  console.log('main.js x: name =', name);
  let initials = strUtil.initials(name);
  $('#content').text('initials are ' + initials);
});

$('body').show();
