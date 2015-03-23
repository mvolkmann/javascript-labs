'use strict';

var http = require('http');

exports.getContent = function (url, cb) {
  http.get(url, function (res) {
    var content = '';
    res.on('data', function (buf) {
      content += buf.toString();
    });
    res.on('end', function (buf) {
      cb(content);
    });
  });
};

exports.getLength = function (url, cb) {
  exports.getContent(url, function (content) {
    cb(content.length);
  });
};

exports.getTitle = function (url, cb) {
  exports.getContent(url, function (content) {
    var token = '<title>';
    var startIndex = content.indexOf(token);
    var endIndex = content.indexOf('</title>', startIndex);
    cb(content.substring(startIndex + token.length , endIndex));
  });
};
