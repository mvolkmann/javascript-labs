/*global exports: false */

function formatDate(date) {
  var amPm, hours, minutes, seconds;

  hours = date.getHours();
  amPm = hours < 13 ? 'AM' : 'PM';
  if (hours > 12) hours -= 12;

  minutes = util.padLeft(date.getMinutes());
  seconds = util.padLeft(date.getSeconds());

  return (date.getMonth() + 1) + '/' + date.getDate() + '/' +
    date.getFullYear().toString().substring(2) + ' ' +
    hours + ':' + minutes + ':' + seconds + ' ' + amPm;
}

function padLeft(number) {
  var s = number.toString();
  return s.length < 2 ? '0' + s : s;
}

function sortingValue(title) {
  var change, first, index, rest, titleLower;

  titleLower = title.toLowerCase();
  index = title.indexOf(' ');
  if (index === -1) return titleLower;

  first = titleLower.substring(0, index);
  rest = titleLower.substring(index + 1);
  change = first === 'the' || first === 'a' || first === 'an';
  return change ? rest + ', ' + first : titleLower;
}

var util = {
  formatDate: formatDate,
  padLeft: padLeft,
  sortingValue: sortingValue
};

try {
  module.exports = util;
} catch (e) {
  // do nothing; happens when not running a Jasmine test
}
