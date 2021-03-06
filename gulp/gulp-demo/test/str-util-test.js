/*global describe: false, expect: false, it: false */
'use strict';

var strUtil = require('../build/str-util.js');

describe('str-util', () => {
  it('can capitalize', () => {
    expect(strUtil.capitalize('')).toBe('');
    expect(strUtil.capitalize('foo')).toBe('Foo');
    expect(strUtil.capitalize('foo bar baz')).toBe('Foo Bar Baz');
  });

  it('can camel', () => {
    expect(strUtil.camel('')).toBe('');
    expect(strUtil.camel('foo')).toBe('Foo');
    expect(strUtil.camel('foo bar baz')).toBe('FooBarBaz');
  });
});
