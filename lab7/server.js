'use strict';

/**
 * Here are some curl commands to test this server.
 *
 * To create a note,
 *   curl http://localhost:3000/note -H'Content-Type: application/json' \
 *     -d'{"title": "foo", "text": "bar"}'
 *   This defaults to a POST due to the presence of the -d option.
 *
 * To get that note,
 *   curl http://localhost:3000/note/foo
 *
 * To get all notes,
 *   curl http://localhost:3000/notes
 *
 * To delete that note,
 *   curl -XDELETE http://localhost:3000/note/foo
 *
 * For the note title at the end of the URL in both get and delete operations,
 * escape spaces with %20.
 */

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

// Can test this will curl like this:
// curl -XPOST http://localhost:3000/sum \
//   -H'Content-Type: application/json' -d"[1, 2, 3, 4]"

function Note(title, text, millis) {
  this.title = title;
  this.timestamp = millis ? new Date(millis) : new Date();
  this.text = text;
}

function deleteNote(req, res) {
  var fileName, title;

  title = req.params.title;
  fileName = getFileName(title);
  fs.unlink(fileName, function (err) {
    if (err) return res.send(500, {error: err});
    res.send(200);
  });
}

function getAllNotes(req, res) {
  var notes = [];

  fs.readdir(__dirname, function (err, fileNames) {
    if (err) return res.send(500, {error: err});

    var count = fileNames.length, readError = false;

    function decrementCount() {
      if (--count === 0) {
        res.contentType('application/json');
        res.send(JSON.stringify(notes));
      }
    }

    fileNames.forEach(function (fileName) {
      if (readError) return;

      var extension, index;

      index = fileName.lastIndexOf('.');
      extension = index === -1 ? null : fileName.substring(index + 1);
      if (extension !== 'note') return decrementCount();

      readNote(fileName, function (err, note) {
        if (err) {
          readError = true;
          res.send(500, {error: err});
        } else {
          notes.push(note);
          decrementCount();
        }
      });
    });
  });
}

function getFileName(title) {
  return title.replace(/ /g, '-') + '.note';
}

function getNote(req, res) {
  var fileName, title;

  title = req.params.title;
  fileName = getFileName(title);
  readNote(fileName, function (err, note) {
    if (err) {
      if (err.code === 'ENOENT') {
        res.send(404); // not found
      } else {
        res.send(500, {error: err});
      }
    } else {
      res.contentType('application/json');
      res.send(JSON.stringify(note));
    }
  });
}

function getTitle(fileName) {
  var index = fileName.lastIndexOf('.');
  return fileName.substring(0, index).replace('-', ' ');
}

function putNote(req, res) {
  var content, fileName, note;

  note = req.body;
  // The Date class has a toJSON method (added in ES5)
  // that turns Date objects into an ISO date string.
  // note.timestamp is an ISO date string.
  // new Date(note.timestamp) creates a Date object from it.
  content = new Date(note.timestamp).getTime() + '\n' + note.text;
  fileName = getFileName(note.title);
  fs.writeFile(fileName, content, function (err) {
    if (err) return res.send(500, {error: err});
    res.send(200);
  });
}

function readNote(fileName, cb) {
  var options = {encoding: 'utf8'};
  fs.readFile(fileName, options, function (err, content) {
    if (err) return cb(err);

    var index, millis, note, text, title;

    title = getTitle(fileName);
    index = content.indexOf('\n');
    millis = parseInt(content.substring(0, index), 10);
    text = content.substring(index + 1);
    note = new Note(title, text, millis);
    cb(null, note);
  });
}

var app = express();

// Automatically parse JSON in request bodies into JavaScript values.
app.use(bodyParser());

// Serve static files in the current directory.
app.use(express.static(__dirname));


app.get('/note/:title', getNote);
app.get('/notes', getAllNotes);
app.post('/note', putNote);
// Avoiding JSHint warning about "delete" being a reserved word.
app['delete']('/note/:title', deleteNote);

var PORT = 3000;
app.listen(PORT);
console.log('listening on port', PORT);
