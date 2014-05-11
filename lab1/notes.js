'use strict';

var fs, rl, intf, noteArray, noteMap = {};
fs = require('fs');
rl = require('readline');
intf = rl.createInterface(process.stdin, process.stdout);

function chooseOption() {
  intf.question('\nChoose option: ', function (option) {
    var c, number;

    option = option.trim();

    c = option.charAt(0).toLowerCase();
    number = parseInt(option.substring(1), 10);

    switch (c) {

    case 'c': // create
      createNote(function (err) {
        if (err) console.error(err);
        chooseOption();
      });
      break;

    case 'd': // delete
      deleteNote(number, function (err) {
        if (err) console.error(err);
        chooseOption();
      });
      break;

    case 'h': // help
    case '?':
      help();
      chooseOption();
      break;

    case 'l': // list
      listNotes();
      chooseOption();
      break;

    case 'm': // modify
      modifyNote(number, function (err) {
        if (err) console.error(err);
        chooseOption();
      });
      break;

    case 'p': // print
      printNote(number);
      chooseOption();
      break;

    case 'x': // exit
      intf.close();
      break;

    default:
      if (option.length) console.error('invalid option', option);
      chooseOption();
      break;
    }
  });
}

function createNote(cb) {
  intf.question('Title: ', function (title) {
    if (!title) return cb();

    console.log('Text: (press return on empty line to end)');
    getText(function (text) {
      if (!text) return cb();

      var note = {
        title: title,
        text: text,
        timestamp: new Date()
      };
      noteMap[title] = note;
      updateNoteArray();
      saveNote(note, cb);
    });
  });
}

function deleteNote(number, cb) {
  var note, title;

  note = getNote(number);
  if (!note) return cb();

  title = note.title;
  fs.unlink(getFileName(title), function (err) {
    if (!err) {
      delete noteMap[title];
      updateNoteArray();
      console.log('deleted note with title "' + title + '"');
    }
    cb(err);
  });
}

function formatDate(date) {
  var amPm, hours, minutes, seconds;

  hours = date.getHours();
  amPm = hours < 13 ? 'AM' : 'PM';
  if (hours > 12) hours -= 12;

  minutes = padLeft(date.getMinutes());
  seconds = padLeft(date.getSeconds());

  return (date.getMonth() + 1) + '/' + date.getDate() + '/' +
    date.getFullYear().toString().substring(2) + ' ' +
    hours + ':' + minutes + ':' + seconds + ' ' + amPm;
}

function getFileName(title) {
  return title.replace(/ /g, '-') + '.note';
}

function getNote(number) {
  if (number) {
    var note = noteArray[number - 1];
    if (note) return note;
    console.log('note #' + number + ' does not exist.');
  } else {
    console.log('must specify note number');
  }
}

/**
 * Gets text from user until they press return on a blank line.
 * @param cb callback that is passed the text
 */
function getText(cb) {
  intf.question('', function (text) {
    if (!text) return cb('');

    getText(function (nextText) {
      cb(text + '\n' + nextText);
    });
  });
}

function getTitle(fileName) {
  var index = fileName.lastIndexOf('.');
  return fileName.substring(0, index).replace(/-/g, ' ');
}

function help() {
  console.log('Options:');
  console.log('  (h)elp or ?');
  console.log('  (c)reate note');
  console.log('  (d)elete note, followed by note number');
  console.log('  (l)ist notes');
  console.log('  (m)odify note, followed by note number');
  console.log('  (p)rint note, followed by note number');
  console.log('  e(x)it');
}

function listNotes() {
  var i = 0;
  noteArray.forEach(function (note) {
    console.log(++i + ')', note.title, '-', formatDate(note.timestamp));
  });
}

function loadNotes(cb) {
  fs.readdir(__dirname, function (err, fileNames) {
    if (err) return cb(err);

    var count = fileNames.length;
    function decrementCount() {
      if (--count === 0) cb();
    }

    fileNames.forEach(function (fileName) {
      var extension, index, options;

      index = fileName.lastIndexOf('.');
      extension = index === -1 ? null : fileName.substring(index + 1);
      if (extension !== 'note') return decrementCount();

      options = {encoding: 'utf8'};
      fs.readFile(fileName, options, function (err, content) {
        if (err) return cb(err);

        var index, millis, note, title;

        title = getTitle(fileName);

        // The first line of each note file is the
        // timestamp of creation or modification in milliseconds.
        index = content.indexOf('\n');
        millis = parseInt(content.substring(0, index), 10);
        note = {
          title: title,
          timestamp: new Date(millis),
          text: content.substring(index + 1)
        };
        noteMap[title] = note;

        decrementCount();
      });
    });
  });
}

function modifyNote(number, cb) {
  var note = getNote(number);
  if (!note) return cb();

  console.log('Text: (press return on empty line to end)');
  getText(function (text) {
    if (!text) return cb();

    note.text = text;
    note.timestamp = new Date();
    saveNote(note, cb);
  });
}

function padLeft(number) {
  var s = number.toString();
  return s.length < 2 ? '0' + s : s;
}

function printNote(number) {
  var note, text;

  note = getNote(number);
  if (!note) return;

  console.log('title:', note.title);
  console.log('timestamp:', formatDate(note.timestamp));
  text = note.text.slice(0, -1); // removes trailing newline
  console.log('text:\n' + text);
}

function saveNote(note, cb) {
  var content, fileName;

  fileName = getFileName(note.title);
  content = note.timestamp.getTime() + '\n' + note.text;
  fs.writeFile(fileName, content, cb);
}

function sortingValue(title) {
  var change, first, index, rest, titleLower;

  titleLower = title.toLowerCase();
  index = title.indexOf(' ');
  if (index === -1) return titleLower;

  first = titleLower.substring(0, index);
  rest = titleLower.substring(index + 1);
  change = first === 'the' || first === 'a' || first === 'an';
  return change ? rest + ', ' + first : titleLower;
}

function start() {
  loadNotes(function (err) {
    if (err) {
      console.error(err);
    } else {
      updateNoteArray();
      console.log('Welcome to JS Notes!\n');
      help();
      chooseOption();
    }
  });
}

function titleSort(t1, t2) {
  return sortingValue(t1).localeCompare(sortingValue(t2));
}

function updateNoteArray() {
  noteArray = [];
  var titles = Object.keys(noteMap);
  titles.sort(titleSort).forEach(function (title) {
    var note = noteMap[title];
    noteArray.push(note);
  });
}

start();
