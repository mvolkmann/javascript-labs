'use strict';
/*global describe: false, expect: false, it: false */

var math = require('src/math');

describe('math suite', function () {
  it('adds', function () {
    expect(math.add(1, 2)).toBe(3);
  });
});
