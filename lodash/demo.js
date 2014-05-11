var _ = require('lodash');

var map = {};
map.red = {selected: false};
map.green = {selected: false};
map.blue = {selected: false};

console.log(_.some(map, 'selected'));
