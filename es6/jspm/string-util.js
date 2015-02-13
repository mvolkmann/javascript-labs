export default {
  camel(text) {
    return text.split(' ').
      map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).
      join('');
  },
  initials(text) {
    return text.split(' ').map(word => word[0]).join('');
  }
};
