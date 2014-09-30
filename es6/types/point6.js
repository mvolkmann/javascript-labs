// Polyfill for new ES6 method not supported yet by Traceur.
Math.hypot = (x, y) => Math.sqrt(x * x + y * y);

class Point {
  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  distanceFrom(point:Point) {
    return Math.hypot(this.x - point.x, this.y - point.y);
  }
}

var p1 = new Point(1, 2);
var p2 = new Point(4, 6);
console.log('distance =', p1.distanceFrom(p2));
