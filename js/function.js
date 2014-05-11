// This is an example of creating a dynamic function object.
// It can result in more efficienct functions when conditional logic
// can be removed from functions that will be executed many times.

// The Function constructor is a form of eval.
/*jshint evil: true */
//var area = new Function('width', 'height', 'return width * height');
var area = new Function('width, height', 'return width * height');
console.log('area =', area(4, 5));
