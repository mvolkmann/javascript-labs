'use strict';

var ageInput, deleteBtn, nameInput, relationshipSelect, table;

// Adds a cell containing a given value to a given table row.
// If the value is a string then a text node is created.
// Otherwise the value is added to the new cell as-is.
function appendCell(row, value) {
  // TODO: Declare the variable "child".
  // TODO: If value is a string,
  // TODO: set child to a new text node with that value.
  // TODO: If value is not a string (ex. an element),
  // TODO: set child to that value.

  // TODO: Add a new cell (td) to the end of row
  // TODO: and append child to the new cell.
}

// Adds a row to the family table using data from the inputs.
function addRow() {
  var checkbox, row;

  // TODO: Set checkbox to a new "input" element.
  // TODO: Set the type attribute of checkbox to "checkbox".
  // TODO: Register the checkboxChange function
  // TODO: as a "change" event listener on the checkbox.

  // TODO: Set row to a new row (tr) that is appended to table.

  appendCell(row, checkbox);
  appendCell(row, nameInput.value);
  appendCell(row, relationshipSelect.value);
  appendCell(row, ageInput.value);

  // TODO: Clear nameInput by setting its value to an empty string.
  // TODO: Clear ageInput by setting its value to an empty string.
  // TODO: Move focus to nameInput.
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
    // TODO: Set row to the grandparent (tr) of checkbox
    // TODO: (the parent is a td).
    // TODO: Remove the row from its parent.
  }

  // TODO: Disable deleteBtn since no remaining checkboxes are checked.
}

// Gets all the checkboxes that are checked.
function getChecked() {
  // TODO: Return all the checkboxes that are checked
  // TODO: using the selector 'input:checked[type = "checkbox"]'.
}

window.onload = function () {
  // Find elements that will be references multiple times.
  // TODO: Set nameInput to the element with id 'nameInput'.
  // TODO: Set relationshipSelect to the element with id 'relationshipSelect'.
  // TODO: Set ageInput to the element with id 'ageInput'.
  // TODO: Set deleteBtn to the element with id 'deleteBtn'.
  // TODO: Set table to the element with id 'familyTable'.

  // Setup event handling.
  // TODO: Get the element with id 'addBtn' and
  // TODO: register addRow as a click handler.
  // TODO: Register deleteRows as a click handler on deleteBtn.
};
