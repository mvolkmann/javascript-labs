'use strict';
/*global setup: false, suite: false, teardown: false, test: false */

var demo = require('../scripts/demo');

var assert = require('assert');

// Can have nested suites.
suite('math', function () {
  setup(function (done) {
    console.log('setup entered');
    done();
  });

  teardown(function (done) {
    console.log('teardown entered');
    done();
  });

  test('addition works', function () {
    assert.equal(2 + 2, 4);
  });

  test('demo add', function () {
    assert.equal(demo.add(2, 2), 4);
  });
});
