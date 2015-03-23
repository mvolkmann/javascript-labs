'use strict';
/*global describe: false, expect: false, it: false, util: true */

// gulp needs this
if (!util) var util = require('../scripts/util');

describe('formatDate', function () {
  it('should format', function () {
    var date = new Date(1961, 3, 16, 1, 2, 3);
    var actual = util.formatDate(date);
    var expected = '4/16/61 1:02:03 AM';
    expect(actual).toBe(expected);
  });
});

describe('padLeft', function () {
  it('should pad', function () {
    var actual = util.padLeft(3);
    var expected = '03';
    expect(actual).toBe(expected);

    actual = util.padLeft(19);
    expected = '19';
    expect(actual).toBe(expected);

    actual = util.padLeft(789);
    expected = '789';
    expect(actual).toBe(expected);
  });
});

describe('sortingValue', function () {
  it('should prep for sorting', function () {
    var actual = util.sortingValue('');
    var expected = '';
    expect(actual).toBe(expected);

    actual = util.sortingValue('Foo Bar');
    expected = 'foo bar';
    expect(actual).toBe(expected);

    actual = util.sortingValue('The Big Show');
    expected = 'big show, the';
    expect(actual).toBe(expected);

    actual = util.sortingValue('A Large Show');
    expected = 'large show, a';
    expect(actual).toBe(expected);

    actual = util.sortingValue('An Awesome Show');
    expected = 'awesome show, an';
    expect(actual).toBe(expected);
  });
});
