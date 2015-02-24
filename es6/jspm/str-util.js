export function camel(text) {
  return text.split(' ').
    map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).
    join('');
}

export function initials(text) {
  return text.split(' ').map(word => word[0]).join('');
}
