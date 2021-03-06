'use strict';

var fs = require('fs');
var rl = require('readline');
var intf = rl.createInterface(process.stdin, process.stdout);

//----------------------------------------------------------------------------

function Note(title, text, millis) {
  this.title = title;
  this.timestamp = millis ? new Date(millis) : new Date();
  this.text = text;
  Note.map[title] = this;
  Note.updateArray();
}

Note.array = [];
Note.map = {};

Note.create = function (cb) {
  intf.question('Title: ', function (title) {
    if (!title) return cb();

    console.log('Text: (press return on empty line to end)');
    getText(function (text) {
      if (!text) return cb();
      new Note(title, text).save(cb);
    });
  });
};

Note.get = function (number) {
  if (number) {
    var note = Note.array[number - 1];
    if (note) return note;
    console.log('note #' + number + ' does not exist.');
  } else {
    console.log('must specify note number');
  }
};

Note.list = function () {
  var i = 0;
  Note.array.forEach(function (note) {
    console.log(++i + ')', note.title, '-', formatDate(note.timestamp));
  });
};

Note.loadAll = function (cb) {
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

        var index, millis, note, text;
        index = content.indexOf('\n');
        millis = parseInt(content.substring(0, index), 10);
        text = content.substring(index + 1);
        note = new Note(getTitle(fileName), text, millis);

        decrementCount();
      });
    });
  });
};

Note.updateArray = function () {
  Note.array = [];
  var titles = Object.keys(Note.map);
  titles.sort(titleSort).forEach(function (title) {
    var note = Note.map[title];
    Note.array.push(note);
  });
};

Note.prototype.del = function (cb) {
  var that = this;
  fs.unlink(this.getFileName(), function (err) {
    if (!err) {
      delete Note.map[that.title];
      Note.updateArray();
      console.log('deleted note with title "' + that.title + '"');
    }
    cb(err);
  });
};

Note.prototype.getFileName = function () {
  return this.title.replace(/ /g, '-') + '.note';
};

Note.prototype.modify = function (text, cb) {
  this.text = text;
  this.timestamp = new Date();
  this.save(cb);
};

Note.prototype.print = function () {
  console.log('title:', this.title);
  console.log('timestamp:', formatDate(this.timestamp));
  var text = this.text.slice(0, -1); // removes trailing newline
  console.log('text:\n' + text);
};

Note.prototype.save = function (cb) {
  var content = this.timestamp.getTime() + '\n' + this.text;
  fs.writeFile(this.getFileName(), content, cb);
};

//----------------------------------------------------------------------------

function chooseOption() {
  var note;

  intf.question('\nChoose option: ', function (option) {
    var c, number;

    option = option.trim();

    c = option.charAt(0).toLowerCase();
    number = parseInt(option.substring(1), 10);

    switch (c) {

    case 'c': // create
      Note.create(function (err) {
        if (err) console.error(err);
        chooseOption();
      });
      break;

    case 'd': // delete
      note = Note.get(number);
      if (note) {
        note.del(function (err) {
          if (err) console.error(err);
          chooseOption();
        });
      } else {
        chooseOption();
      }
      break;

    case 'h': // help
    case '?':
      help();
      chooseOption();
      break;

    case 'l': // list
      Note.list();
      chooseOption();
      break;

    case 'm': // modify
      modifyNote(number, function (err) {
        if (err) console.error(err);
        chooseOption();
      });
      break;

    case 'p': // print
      note = Note.get(number);
      if (note) note.print();
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

function modifyNote(number, cb) {
  var note = Note.get(number);
  if (!note) return cb();

  console.log('Text: (press return on empty line to end)');
  getText(function (text) {
    if (!text) return cb();
    note.modify(text, cb);
  });
}

function padLeft(number) {
  var s = number.toString();
  return s.length < 2 ? '0' + s : s;
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
  Note.loadAll(function (err) {
    if (err) {
      console.error(err);
    } else {
      Note.updateArray();
      console.log('Welcome to JS Notes!\n');
      help();
      chooseOption();
    }
  });
}

function titleSort(t1, t2) {
  return sortingValue(t1).localeCompare(sortingValue(t2));
}

start();
