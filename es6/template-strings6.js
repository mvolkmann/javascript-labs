/*jshint esnext: true */

let firstName = 'Mark';
let lastName = 'Volkmann';

let result = `Hello ${firstName} ${lastName}!`;
console.log('untagged =', result);

let mls = `one
two
three`;
console.log('mls =', mls);

// Could perform special escaping or translation of the strings or values.
function upValues(strings, ...values) {
  //console.log('strings =', strings);
  //console.log('values =', values);
  let result = strings[0];
  values.forEach((value, index) =>
    result += value.toUpperCase() + strings[index + 1]);
  return result;
}
result = upValues `Hello ${firstName} ${lastName}!`;
console.log(result);

function dedent(strings, ...values) {
  console.log('template-strings6.js dedent: strings =', strings);
  let last = strings.length - 1, re = /\n\s+/g, result = '';
  for (let i = 0; i < last; i++) {
    result += strings[i].replace(re, '\n') + values[i];
  }
  return result + strings[last].replace(re, '\n');
}

let homeTeam = 'Cardinals';
let visitingTeam = 'Cubs';
console.log(dedent `Today the ${homeTeam}
                    are hosting the ${visitingTeam}.`);
// If template starts with an expression, strings will start with ''.
// If template ends with an expression, strings will end with ''.
console.log(dedent `${homeTeam}
                    versus
                    ${visitingTeam}`);

function oneLine(strings, ...values) {
  let last = strings.length - 1, re = /\n\s*/g, result = '';
  for (let i = 0; i < last; i++) {
    result += strings[i].replace(re, ' ') + values[i];
  }
  return result + strings[last].replace(re, ' ');
}

console.log(oneLine `This is a very long sentence
                     that is split over multiple lines,
                     but is really a single line
                     with no newline characters.`);
