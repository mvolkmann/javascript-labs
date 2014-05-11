'use strict';

var ageInput, deleteBtn, nameInput, relationshipSelect, table;

// Adds a cell containing a given value to a given table row.
// If the value is a string then a text node is created.
// Otherwise the value is added to the new cell as-is.
function appendCell(row, value) {
  var child = typeof value === 'string' ?
    document.createTextNode(value) : value;

  // docs say insertCell index defaults to -1, but it doesn't
  row.insertCell(-1).appendChild(child);
}

// Adds a row to the family table using data from the inputs.
function addRow() {
  var checkbox, row;

  checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.onchange = checkboxChange;

  // docs say insertRow index defaults to -1, but it doesn't
  row = table.insertRow(-1);
  appendCell(row, checkbox);
  appendCell(row, nameInput.value);
  appendCell(row, relationshipSelect.value);
  appendCell(row, ageInput.value);

  nameInput.value = '';
  ageInput.value = '';
  nameInput.focus();
}

// This is called when any checkbox is checked or unchecked.
function checkboxChange(event) {
  // If the checkbox associated with this event is now checked
  // then the delete button should be enabled.
  // Otherwise, the delete button should only be enabled
  // if at least one other checkbox is checked.
  deleteBtn.disabled = event.target.checked ?
    false : getChecked().length === 0;
}

// Deletes every row containing a checked checkbox.
function deleteRows() {
  var checkbox, checkboxes, i, row;

  checkboxes = getChecked();
  for (i = 0; i < checkboxes.length; i++) {
    checkbox = checkboxes[i];
    row = checkbox.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }

  deleteBtn.disabled = true; // no remaining checkboxes are checked
}

// Gets all the checkboxes that are checked.
function getChecked() {
  return table.querySelectorAll('input:checked[type = "checkbox"]');
}

window.onload = function () {
  // Find elements that will be references multiple times.
  nameInput = document.getElementById('nameInput');
  relationshipSelect = document.getElementById('relationshipSelect');
  ageInput = document.getElementById('ageInput');
  deleteBtn = document.getElementById('deleteBtn');
  table = document.getElementById('familyTable');

  // Setup event handling.
  document.getElementById('addBtn').onclick = addRow;
  deleteBtn.onclick = deleteRows;
};
