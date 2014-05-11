'use strict';

var http = require('http');

exports.getContent = function (url, cb) {
  http.get(url, function (res) {
    var page = '';
    res.on('data', function (buf) {
      page += buf.toString();
    });
    res.on('end', function (buf) {
      cb(page);
    });
  });
};

exports.getLength = function (url, cb) {
  exports.getContent(url, function (page) {
    cb(page.length);
  });
};

exports.getTitle = function (url, cb) {
  exports.getContent(url, function (page) {
    var token = '<title>';
    var startIndex = page.indexOf(token);
    var endIndex = page.indexOf('</title>', startIndex);
    cb(page.substring(startIndex + token.length , endIndex));
  });
};
