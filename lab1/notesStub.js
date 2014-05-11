'use strict';

var fs, rl, intf, noteArray, noteMap = {};
fs = require('fs');
rl = require('readline');
intf = rl.createInterface(process.stdin, process.stdout);

function chooseOption() {
  intf.question('\nChoose option: ', function (option) {
    option = option.trim();

    // TODO: Declare c and set it to the lowercase version
    // TODO: of the first character in option.

    // TODO: Declare number and set it to the result of converting
    // TODO: the part of option after the first character to an integer.

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

      // TODO: Declare note and set it to an object
      // TODO: with the following properties.
      // TODO: - title with value title
      // TODO: - text with value text
      // TODO: - timestamp with value that is a new Date object

      // TODO: Add a property to noteMap where
      // TODO: the key is title and the value is note.

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

// TODO: Write the first line of a function named "formatDate"
// TODO: that has one parameter named "date".
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
  // TODO: Declare index and set it to
  // TODO: the index of the last period in fileName.

  // TODO: Return the result of getting the characters in fileName
  // TODO: before the first period and replacing all hyphens with spaces.
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
      // TODO: Subtract one from count.
      // TODO: If count is zero, call cb.
    }

    fileNames.forEach(function (fileName) {
      var extension, index, options;

      // TODO: Set extension to the file extension at the end of fileName.
      if (extension !== 'note') return decrementCount();

      var options = {encoding: 'utf8'};
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
  // TODO: Declare s and set it to number converted to a string.
  // TODO: Return s, but if only one digit, add zero to the front.
}

function printNote(number) {
  var note = getNote(number);
  if (!note) return;

  console.log('title:', note.title);
  console.log('timestamp:', formatDate(note.timestamp));
  // TODO: Declare text and set it to note.text with
  // TODO: the trailing newline (last character) removed.
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

  // TODO: Set titleLower to the lowercase version of title.

  // TODO: Set index to the index of the first space in title.

  // TODO: If no space was found, return titleLower.

  // TODO: Set first to the first word in titleLower.

  // TODO: Set rest to the part of titleLower after the first space.
 
  // TODO: Set change to a boolean that indicates
  // TODO: whether first is 'the', 'a' or 'an'.

  // TODO: If change is true,
  // TODO: return rest + ', ' + first,
  // TODO: otherwise return titleLower.
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
    // TODO: Declare note and set it to the value of noteMap with key title.

    // TODO: Add note to the end of noteArray.
  });
}

// TODO: Call the start function.
