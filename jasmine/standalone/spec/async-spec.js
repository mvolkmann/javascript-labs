'use strict';
/*global afterEach: false, beforeEach: false, describe: false,
  expect: false, it: false, runs: false, waitsFor: false */

describe('old-style async suite', function () {
  var done = false, timeout = 750, value = 0;

  it('should support testing async functions', function () {
    // The function passed to run below
    // performs an asynchronous operation.
    // When the operation completes, it sets done to true.
    runs(function () {
      // This is an example of an asynchronous function.
      // It increments value after 500 ms.
      setTimeout(function () {
        value++;
        done = true;
      }, 500);
    });

    // The function passed to waitsFor is called repeatedly
    // until it returns true.  That will only happen when
    // the function passed to runs above sets done to true.
    // The second argument is a string that is used to form an error message
    // if the asynchronous function doesn't complete within the timeout.
    // It will be appended to the error message
    // "timeout: timed out after 750 msec waiting for ".
    waitsFor(function () { return done; },
      'my async function', timeout);

    // The function passed to run below will only be executed after
    // the function passed to waitsFor above returns true.
    // This is where assertions are made about the results
    // of the asynchronous function invoked earlier.
    runs(function () {
      expect(value).toBeGreaterThan(0);
    });
  });
});

describe('new-style async suite', function () {
  //console.log('timeout =', jasmine.DEFAULT_TIMEOUT_INTERVAL);

  beforeEach(function (done) {
    console.log('beforeEach: done =', done);
    setTimeout(function () {
      console.log('leaving beforeEach');
      done();
    }, 200);
  });

  afterEach(function (done) {
    console.log('afterEach: done =', done);
    setTimeout(function () {
      console.log('leaving afterEach');
      done();
    }, 200);
  });

  it('should support better testing async functions', function (done) {
    console.log('it: done =', done);
    var value = 0;
    setTimeout(function () {
      value++;
      expect(value).toBeGreaterThan(0);
      console.log('leaving it');
      done();
    }, 200); // will timeout with 600 ms
  });
});
