'use strict';
/*global beforeEach: false, describe: false, expect: false,
  it: false, spyOn: false */

var page = require('../src/page');

describe('page spy with fake', function () {
  beforeEach(function () {
    spyOn(page, 'getTitle').andCallFake(function (title, cb) {
      cb('Mark Volkmann');
    });
  });

  it('should have a title', function () {
    var url = 'http://java.ociweb.com/mark/';
    page.getTitle(url, function (title) {
      expect(page.getTitle).toHaveBeenCalled();
      expect(title).toBe('Mark Volkmann');
    });
  });
});

describe('page spy', function () {
  beforeEach(function () {
    // Create a spy for each page method that delegates to the original.
    for (var prop in page) {
      if (typeof page[prop] === 'function') {
        spyOn(page, prop).andCallThrough();
      }
    }
  });

  it('should have a title', function (done) {
    var url = 'http://java.ociweb.com/mark/';
    page.getTitle(url, function (title) {
      expect(page.getContent).toHaveBeenCalled();
      expect(page.getLength).not.toHaveBeenCalled();
      expect(page.getTitle).toHaveBeenCalled();
      expect(page.getTitle.mostRecentCall.args[0]).toBe(url);
      expect(title).toBe('Mark Volkmann');
      done();
    });
  });
});
