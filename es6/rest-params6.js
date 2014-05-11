'use strict';
/*jshint esnext: true */

function report(firstName, lastName, ...colors) {
  var phrase = colors.length === 0 ? 'no colors' :
    colors.length === 1 ? 'the color ' + colors[0]:
    'the colors ' + colors.join(' and ');
  console.log(firstName, lastName, 'likes', phrase + '.');
}

report('Mark', 'Volkmann', 'yellow');
report('Tami', 'Volkmann', 'pink', 'blue');
report('John', 'Doe');

