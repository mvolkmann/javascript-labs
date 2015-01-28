'use strict';
/*jshint esnext: true */

function report(firstName, lastName, ...colors) {
  let phrase = colors.length === 0 ? 'no colors' :
    colors.length === 1 ? 'the color ' + colors[0]:
    'the colors ' + colors.join(' and ');
  console.log(firstName, lastName, 'likes', phrase + '.');
}

report('John', 'Doe');
report('Mark', 'Volkmann', 'yellow');
report('Tami', 'Volkmann', 'pink', 'blue');

