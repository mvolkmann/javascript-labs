'use strict';
/*global describe: false, expect: false, it: false */

describe('array suite', function () {

  it('pushes', function () {
    var arr = [1, 2];
    arr.push(3);
    expect(arr.length).toBe(3);
  });
});
