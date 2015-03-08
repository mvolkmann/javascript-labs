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

// If running from a Jasmine test ...
if (exports) {
  exports.capitalize = capitalize;
  exports.camel = camel;
}
