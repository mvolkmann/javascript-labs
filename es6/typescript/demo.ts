function double(n: number): number {
  return n * 2;
}

console.log('3 doubled is', double(3));
//console.log('foo doubled is', double('foo'));
// gives error "Argument of type 'string' is not
// assignable to parameter of type 'number'."

var first = (s: string):string => s.charAt(0);
var s = 'Mark';
console.log('first of', s, 'is', first(s));
