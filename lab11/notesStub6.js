'use strict';

//TODO: Replace all var statements in this file with let or const.
//TODO: Use const if the value will never change.  Most should be const.
//TODO: Rather than declare all variables at the beginning of each function,
//TODO: declare them when they are first used.
var $, currentNote, deleteBtn, messageArea, notes = {},
  textArea, timestampSpan, titleInput, titleSelect;

$ = document.getElementById.bind(document);

//TODO: Change this constructor function to a ES6 class.
function Note(title, text, millis) {
  this.title = title;
  this.timestamp = millis ? new Date(millis) : new Date();
  this.text = text;
  //TODO: Change this to call the add method in this class.
  //TODO: See the next TODO.
  addNote(this);
}

//TODO: Change this to be a method in the Note class
//TODO: that takes no arguments and operates on the Note object.
function addNote(note) {
  notes[note.title] = note;
  addOption(note.title);
}

function addOption(title) {
  var newOption, option, otherSV, otherTitle, thisSV;

  thisSV = sortingValue(title);

  // Find the option the new one should precede
  // to be in alphabetical order.
  option = titleSelect.firstChild;
  while (option) {
    otherTitle = option.text;
    otherSV = sortingValue(otherTitle);
    if (otherSV === thisSV) return; // already present
    if (otherSV >= thisSV) break; // insert before this option
    option = option.nextSibling;
  }

  // Create a new option and add it where it belongs.
  newOption = document.createElement('option');
  newOption.text = title;
  if (option) {
    titleSelect.insertBefore(newOption, option);
  } else {
    titleSelect.appendChild(newOption);
  }
}

function clear() {
  messageArea.style.display = 'none';
  titleSelect.selectedIndex = -1; // nothing selected
  titleInput.value = '';
  timestampSpan.textContent = '';
  textArea.value = '';
  enableButton(deleteBtn, false);
  currentNote = null;
  titleInput.focus();
}

//TODO: Change this to be a method in the Note class
//TODO: that takes no arguments and operates on the Note object.
function deleteNote() {
  var key, option, title;

  title = currentNote.title;

  // Remove the corresponding option from titleSelect.
  option = titleSelect.firstChild;
  while (option) {
    if (option.text === title) {
      titleSelect.removeChild(option);
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
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
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
  //TODO: Change this to use a for-of loop
  //TODO: instead of the Array forEach method.
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
      //TODO: Remove the next line.
      note.timestamp = new Date(note.timestamp);
      //TODO: Uncomment the next line.
      //TODO: This is necessary to create a real Note object.
      //note = new Note(note.title, note.text, note.timestamp);

      //TODO: Change this to call the add method on the note object.
      addNote(note);
    }
  });
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
  var title = titleSelect.value;
  currentNote = notes[title];
  titleInput.value = title;
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

//TODO: Change the anonymous function to an arrow function.
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
  //TODO: Change this to be a function can calls the delete method on currentNote.
  deleteBtn.onclick = deleteNote;

  titleSelect.onchange = selectNote;

  clear();
};
//TODO: Install eslint with "npm install -g eslint".
//TODO: Run "eslint notes.js" and fix any issues it reports.
