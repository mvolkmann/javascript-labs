/*global exports: false */

function capitalize(text) {
  if (!text) return text;
  return text.split(' ').
    map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).
    join(' ');
}

function camel(text) {
  if (!text) return text;
  return text.split(' ').
    map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).
    join('');
}

try {
  exports.capitalize = capitalize;
  exports.camel = camel;
} catch (e) {
  // ignore - happens when not running a Jasmine test
}
