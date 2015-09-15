'use strict';

const $ = document.getElementById.bind(document);
const notes = {};
let currentNote, deleteBtn, messageArea, textArea,
  timestampSpan, titleInput, titleSelect;

class Note {
  constructor(title, text, millis) {
    this.title = title;
    this.timestamp = millis ? new Date(millis) : new Date();
    this.text = text;
    this.add();
  }

  add() {
    notes[this.title] = this;
    addOption(this.title);
  }

  delete() {
    const title = this.title;

    // Remove the corresponding option from titleSelect.
    let option = titleSelect.firstChild;
    while (option) {
      if (option.text === title) {
        titleSelect.removeChild(option);
        break;
      }
      option = option.nextSibling;
    }

    delete notes[title];
    const key = 'note-' + this.timestamp.getTime();
    delete localStorage[key];
    clear();
  }
}

function addOption(title) {
  const thisSV = sortingValue(title);

  // Find the option the new one should precede
  // to be in alphabetical order.
  let option = titleSelect.firstChild;
  while (option) {
    const otherTitle = option.text;
    const otherSV = sortingValue(otherTitle);
    if (otherSV === thisSV) return; // already present
    if (otherSV >= thisSV) break; // insert before this option
    option = option.nextSibling;
  }

  // Create a new option and add it where it belongs.
  const newOption = document.createElement('option');
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

function enableButton(btn, enable) {
  if (enable) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
  }
}

function formatDate(date) {
  let hours = date.getHours();
  const amPm = hours < 13 ? 'AM' : 'PM';
  if (hours > 12) hours -= 12;

  const minutes = padLeft(date.getMinutes());
  const seconds = padLeft(date.getSeconds());

  return (date.getMonth() + 1) + '/' + date.getDate() + '/' +
    date.getFullYear().toString().substring(2) + ' ' +
    hours + ':' + minutes + ':' + seconds + ' ' + amPm;
}

function loadNotes() {
  for (const key of Object.keys(localStorage)) {
    const index = key.indexOf('-');
    if (index === -1) return;

    const prefix = key.substring(0, index);
    if (prefix === 'note') {
      let note = JSON.parse(localStorage[key]);
      // The Date class has a toJSON method (added in ES5)
      // that turns Date objects into an ISO date string.
      // note.timestamp is an ISO date string.
      // new Date(note.timestamp) creates a Date object from it.
      //note.timestamp = new Date(note.timestamp);
      note = new Note(note.title, note.text, note.timestamp);
      note.add();
    }
  }
}

function padLeft(number) {
  const s = number.toString();
  return s.length < 2 ? '0' + s : s;
}

function saveNote() {
  const title = titleInput.value;
  if (!title) return;
  const text = textArea.value;
  const note = new Note(title, text);

  const key = 'note-' + note.timestamp.getTime();
  localStorage[key] = JSON.stringify(note);
  clear();
}

function selectNote() {
  const title = titleSelect.value;
  currentNote = notes[title];
  titleInput.value = title;
  timestampSpan.textContent = formatDate(currentNote.timestamp);
  textArea.value = currentNote.text;
  enableButton(deleteBtn, true);
}

function sortingValue(title) {
  const titleLower = title.toLowerCase();
  const index = title.indexOf(' ');
  if (index === -1) return titleLower;

  const first = titleLower.substring(0, index);
  const rest = titleLower.substring(index + 1);
  const change = first === 'the' || first === 'a' || first === 'an';
  return change ? rest + ', ' + first : titleLower;
}

window.onload = () => {
  deleteBtn = $('deleteBtn');
  messageArea = $('messageArea');
  textArea = $('textArea');
  timestampSpan = $('timestampSpan');
  titleInput = $('titleInput');
  titleSelect = $('titleSelect');

  loadNotes();

  $('saveBtn').onclick = saveNote;
  $('newBtn').onclick = clear;
  deleteBtn.onclick = () => currentNote.delete();

  titleSelect.onchange = selectNote;

  clear();
};
