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
