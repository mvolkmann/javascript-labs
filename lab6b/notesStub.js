'use strict';
/*jshint jquery: false */
/*global $: true */

var $, currentNote, deleteBtn, messageArea, notes = {},
  textArea, timestampSpan, titleInput, titleSelect;

// TODO: Remind instructor to explain this line.
$ = document.getElementById.bind(document);

function Note(title, text, millis) {
  this.title = title;
  this.timestamp = millis ? new Date(millis) : new Date();
  this.text = text;
  addNote(this);
}

function addNote(note) {
  notes[note.title] = note;
  addOption(note.title);
}

function addOption(title) {
  var newOption, option, otherSV, otherTitle, thisSV;

  thisSV = sortingValue(title);

  // Find the option the new one should precede
  // to be in alphabetical order.
  // TODO: Set option to the first child of titleSelect.
  while (option) {
    otherTitle = option.text;
    otherSV = sortingValue(otherTitle);
    if (otherSV === thisSV) return; // already present
    if (otherSV >= thisSV) break; // insert before this option
    // TODO: Set option to the next sibling element after option.
  }

  // Create a new option and add it where it belongs.
  // TODO: Set newOption to the result of
  // TODO: creating a new element named "option".
  newOption.text = title;
  if (option) {
    // TODO: Insert newOption in titleSelect before option.
  } else {
    // TODO: Append newOption as the last child of titleSelect.
  }
}

function clear() {
  // TODO: Hide messageArea by setting its CSS display property to 'none'.

  titleSelect.selectedIndex = -1; // nothing selected

  // TODO: Clear titleInput by setting its value to ''.

  // TODO: Clear timestampSpan input by setting its textContent to ''.

  // TODO: Clear textArea by setting its value to ''.

  enableButton(deleteBtn, false);
  currentNote = null;

  // TODO: Move focus to titleInput.
}

function deleteNote() {
  var key, option, title;

  title = currentNote.title;

  // Remove the corresponding option from titleSelect.
  option = titleSelect.firstChild;
  while (option) {
    if (option.text === title) {
      // TODO: Remove the option child element from titleSelect.
      break;
    }
    option = option.nextSibling;
  }

  delete notes[title];
  key = 'note-' + currentNote.timestamp.getTime();
  delete localStorage[key];
  clear();
}

function enableButton(btn, enable) {
  if (enable) {
    // TODO: Remove the 'disabled' attribute from btn.
  } else {
    // TODO: Set the 'disabled' attribute on btn to 'disabled'.
  }
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

function loadNotes() {
  Object.keys(localStorage).forEach(function (key) {
    var index, note, prefix;

    index = key.indexOf('-');
    if (index === -1) return;

    prefix = key.substring(0, index);
    if (prefix === 'note') {
      note = JSON.parse(localStorage[key]);
      // The Date class has a toJSON method (added in ES5)
      // that turns Date objects into an ISO date string.
      // note.timestamp is an ISO date string.
      // new Date(note.timestamp) creates a Date object from it.
      note.timestamp = new Date(note.timestamp);
      addNote(note);
    }
  });
}

// Not using this yet, but it will be needed in the next lab.
function log(msg) {
  // TODO: Set the content of messageArea to msg.

  // TODO: Show messageArea by setting its CSS display property to 'block'.
}

function padLeft(number) {
  var s = number.toString();
  return s.length < 2 ? '0' + s : s;
}

function saveNote() {
  var key, note, text, title;

  title = titleInput.value;
  if (!title) return;
  text = textArea.value;
  note = new Note(title, text);

  key = 'note-' + note.timestamp.getTime();
  localStorage[key] = JSON.stringify(note);
  clear();
}

function selectNote() {
  // TODO: Declare title and set it to the value of titleSelect.

  currentNote = notes[title];

  // TODO: Set the value of titleInput to title.

  timestampSpan.textContent = formatDate(currentNote.timestamp);
  textArea.value = currentNote.text;
  enableButton(deleteBtn, true);
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

window.onload = function () {
  deleteBtn = $('deleteBtn');
  messageArea = $('messageArea');
  textArea = $('textArea');
  timestampSpan = $('timestampSpan');
  titleInput = $('titleInput');
  titleSelect = $('titleSelect');

  loadNotes();

  $('saveBtn').onclick = saveNote;
  $('newBtn').onclick = clear;

  // TODO: Setup event handling so when deleteBtn is pressed,
  // TODO: the deleteNote function is called.

  // TODO: Setup event handling so when titleSelect is changed,
  // TODO: by selecting a different option,
  // TODO: the selectNote function is called.

  clear();
};
