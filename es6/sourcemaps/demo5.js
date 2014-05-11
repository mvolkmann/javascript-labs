'use strict';
var arr = [1, 2, 3, 4];
var doubled = arr.map((function(x) {
  return x * 2;
}));
console.log(doubled);
var product = (function(a, b) {
  return a * b;
});
console.log(product(2, 3));
var average = (function(numbers) {
  var sum = numbers.reduce((function(a, b) {
    return a + b;
  }));
  return sum / numbers.length;
});
console.log(average(arr));
window.onload = function() {
  console.log('demo is running');
};

//# sourceMappingURL=demo5.map
