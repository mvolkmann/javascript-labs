'use strict';
/*jshint esnext: true */

function config({color, size, speed, volume}) {
  console.log('color =', color);
  console.log('size =', size);
  console.log('speed =', speed);
  console.log('volume =', volume);
}

config({
  size: 33,
  volume: 11,
  speed: 'fast',
  color: 'yellow'
});
