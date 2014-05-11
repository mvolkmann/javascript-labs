'use strict';

var log = console.log;
var re = /(\d{1,2})\/(\d{1,2})\/(\d{4})/g;
var bd = '4/16/61';
log(re.test(bd)); // false
bd = 'My birthday is 4/16/1961.';
log(re.test(bd)); // true
log(/bar/.test('foobarbaz')); // true

// The RegExp object remembers where it found the previous match.
// The call to exec below starts after that match.
// Since there isn't another match, it returns null.
log('before recreate, ' + re.exec(bd)); // null
// To start from the beginning again, recreate the RegExp object.
re = /(\d{1,2})\/(\d{1,2})\/(\d{4})/g;
log('after recreate, ' + re.exec(bd)); // 4/16/1961,4,16,1961

var s = 'The play begins on 7/25/2010 and ends on 8/3/2010.';
var matches = s.match(re);
for (var i in matches) {
  log(i + ') ' + matches[i]); // 0) 7/25/2010
}                             // 1) 8/3/2010

var result;
while (true) {
  result = re.exec(s);
  if (!result) break;
  log('found ' + result[0] + ' at index ' + result.index);
  log('month=' + result[1] +
      ' day=' + result[2] +
      ' year=' + result[3]); // month=7 day=25 year=2010
                               // month=8 day=3 year=2010
}

var index = s.search(re);
log(index, s[index]); // 19 7

var names = 'Moe and Larry and Curly';
var arr = names.split(' and '); // with a string
log(arr); // Moe,Larry,Curly

var s2 = 'foo19bar243baz';
arr = s2.split(/\d+/); // with a regular expression
log(arr); // foo,bar,baz

function dateToMmddyy(date) {
  var month = date.getMonth() + 1;
  return month + '/' + date.getDate() + '/' + date.getFullYear();
}

function mmddyyToDate(mmddyy) {
  var day, month, pieces, year;

  pieces = mmddyy.split('/');
  month = parseInt(pieces[0], 10) - 1;
  day = parseInt(pieces[1], 10);
  year = parseInt(pieces[2], 10);
  return new Date(year, month, day);
}

function addWeek(mmddyy) {
  var date = mmddyyToDate(mmddyy);
  date.setDate(date.getDate() + 7);
  return dateToMmddyy(date);
}

s = s.replace(re, addWeek);
log(s); // replaces the two dates with current date
