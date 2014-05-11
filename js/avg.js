'use strict';

function avg(arr) {
  /*
  var sum = 0;
  for (var i in arr) { sum += arr[i]; }
  return sum / arr.length;
  */

  var sum = arr.reduce(function (a, b) { return a + b; });
  return sum / arr.length;
}

//console.log('avg =', avg([1, 3, 8]));
