'use strict';

function Player(name, number) {
  this.name = name;
  this.number = number;
}

Player.prototype.valueOf = function () {
  return this.number;
};

var p = new Player('Gretzky', 99);
console.log('add 1 =', 1 + p);
console.log('multiply by 2 =', p * 2);
