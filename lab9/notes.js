'use strict';
/*jshint jquery: false */
/*global $: true, util: false */

var $, currentNote, deleteBtn, messageArea, notes = {},
  textArea, timestampSpan, titleInput, titleSelect;

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

  thisSV = util.sortingValue(title);

  // Find the option the new one should precede
  // to be in alphabetical order.
  option = titleSelect.firstChild;
  while (option) {
    otherTitle = option.text;
    otherSV = util.sortingValue(otherTitle);
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

function ajax(verb, url, operation, successCb, contentType, body) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, url);

  if (successCb) successCb = successCb.bind(null, xhr);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    console.log('xhr =', xhr);

    if (xhr.status === 0) {
      log('failed to ' + operation + '; server may be down');
    } else if (xhr.status !== 200) {
      log('failed to ' + operation + '; ' + xhr.statusCode);
    } else {
      if (successCb) successCb();
      clear();
    }
  };

  if (contentType) xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(body);
}

function clear() {
  messageArea.style.display = 'none';
  titleSelect.selectedIndex = -1; // nothing selected
  titleInput.value = '';
  timestampSpan.innerText = '';
  textArea.value = '';
  enableButton(deleteBtn, false);
  currentNote = null;
  titleInput.focus();
}

function deleteNote() {
  var title, url;

  title = currentNote.title;
  url = '/note/' + title;

  function success() {
    // Remove the corresponding option from titleSelect.
    var option = titleSelect.firstChild;
    while (option) {
      if (option.text === title) {
        titleSelect.removeChild(option);
        break;
      }
      option = option.nextSibling;
    }

    delete notes[title];
  }

  ajax('DELETE', url, 'delete note', success);
}

function enableButton(btn, enable) {
  if (enable) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
  }
}

function loadNotes() {
  var url = 'http://localhost:3000/notes';

  function success(xhr) {
    var notes = JSON.parse(xhr.responseText);
    notes.forEach(function (note) {
      // The Date class has a toJSON method (added in ES5)
      // that turns Date objects into an ISO date string.
      // note.timestamp is an ISO date string.
      // new Date(note.timestamp) creates a Date object from it.
      note.timestamp = new Date(note.timestamp);
      addNote(note);
    });
  }

  ajax('GET', url, 'load notes', success);
}

function log(msg) {
  messageArea.innerText = msg;
  messageArea.style.display = 'block';
}

function saveNote() {
  var body, contentType, note, text, title, url;

  title = titleInput.value;
  if (!title) return;

  text = textArea.value;
  note = new Note(title, text);

  url = 'http://localhost:3000/note';
  contentType = 'application/json';
  body = JSON.stringify(note);
  ajax('POST', url, 'save note', null, contentType, body);
}

function selectNote() {
  var title = titleSelect.value;
  currentNote = notes[title];
  titleInput.value = title;
  timestampSpan.innerText = util.formatDate(currentNote.timestamp);
  textArea.value = currentNote.text;
  enableButton(deleteBtn, true);
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
  deleteBtn.onclick = deleteNote;

  titleSelect.onchange = selectNote;
  alert('ready');
};
