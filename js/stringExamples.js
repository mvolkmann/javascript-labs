var log = console.log;

var c, s = 'World Wide Web';
log(s.length); // 14
c = s.charAt(2); // zero-based index
log(typeof c); // string
log(c); // 'r'
log(s.indexOf('d')); // 4
log(s.lastIndexOf('d')); // 8

// substring takes a start and end index.
// // If end is omitted, it runs to end of string.
// // It does not work with negative indexes.
log(s.substring(4, 8)); // 'd Wi'; stops one short
//
// // slice also takes a start and end index.
// // Negative values count from end of string.
// // -1 refers to the last character.
// // Use s.length for last character.
log(s.slice(4, 8)); // 'd Wi'; stops one short
log(s.slice(-3, -1)); // 'We'; stops one short
log(s.slice(-3)); // 'Web'; goes to end w/ 1 arg

log(s.substr(4, 4)); // 'd Wi'
log(s.substr(-3, 2)); // 'We'
log(s.substr(-3)); // 'Web'

log(s.toLowerCase()); // 'world wide web'
log(s.toUpperCase()); // 'WORLD WIDE WEB'

log('foo' + 'bar'); // 'foobar'
log('foo'.concat('bar')); // 'foobar'
s = 'foo';
s += 'bar';
log(s); // 'foobar'

log(s.replace('o', '*')); // 'f*obar'
log(s.replace(/[ao]/g, '*')); // 'f**b*r'
s = 'My movie title';
log(s.replace(/ ./g, function (match) {
  return match.toUpperCase();
}));
