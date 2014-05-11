function assert(condition, msg) {
  if (!condition) console.log('assertion failed' + (msg ? ': ' + msg : ''));
}

function size(obj) {
  var count = 0;
  for (var prop in obj) if (obj.hasOwnProperty(prop)) count++;
  return count;
}

var colorMap = {red: 1, green: 2, blue: 3};
assert(size(colorMap) === 3);
assert(colorMap['green'] === 2);
assert(colorMap.green === 2);

var colorSet = {};
colorSet.red = true;
colorSet.green = true;
colorSet.blue = true;
colorSet.red = true;
assert(size(colorSet) === 3);
assert(colorSet.green);
assert(!colorSet.yellow);
