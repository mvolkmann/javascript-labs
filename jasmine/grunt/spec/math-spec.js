'use strict';
/*global describe: false, expect: false, it: false, math: false */

describe('math suite', function () {
  it('adds', function () {
    expect(math.add(1, 2)).toBe(3);
  });
});
