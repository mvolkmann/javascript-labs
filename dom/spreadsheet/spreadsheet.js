'use strict';

var colCount = 4;
var popupTarget;
var $ = document.getElementById.bind(document);

function addHeadingRow(table) {
  var charCode = 65, cell, cells, colNum, tr, values = [''];

  // Populate array of column letters.
  for (colNum = 1; colNum < colCount; colNum++) {
    values.push(String.fromCharCode(charCode));
    charCode++;
  }

  tr = makeRow(table, values, true);
  table.appendChild(tr);

  // Setup click handling for column headings.
  cells = tr.childNodes;
  for (colNum = 1; colNum < colCount; colNum++) {
    cell = cells[colNum];
    cell.onclick = selectColumn.bind(null, table, colNum);
    cell.oncontextmenu = showPopupMenu;
  }
}

function addRow(table, values, readOnly) {
  table.appendChild(makeRow(table, values, readOnly));
}

function deselectAll(table) {
  var i, selected;
 
  selected = table.getElementsByClassName('selected');

  // We must iterate through the selected NodeList backwards
  // because it is a live node list and nodes are removed from it
  // when the 'selected' class is removed from them.
  for (i = selected.length - 1; i >= 0; i--) {
    selected[i].className = '';
  }
}

function hidePopupMenu(event) {
  var popup = $('popup');
  popup.style.display = 'none';
}

function selectColumn(table, colNum) {
  var cell, child, i, row, rowNum, rows, selected;

  deselectAll(table);
 
  // Select all the cells in colNum.
  rows = table.childNodes;
  for (rowNum = 0; rowNum < rows.length; rowNum++) {
    row = rows[rowNum];
    setCellClassName(row.childNodes[colNum], 'selected');
  }
}

function selectRow(table, rowNum) {
  var cells, colNum, i, row, selected;

  deselectAll(table);
 
  // Select all the cells in rowNum.
  row = table.childNodes[rowNum];
  cells = row.childNodes;
  colCount = cells.length;
  for (colNum = 0; colNum < colCount; colNum++) {
    setCellClassName(cells[colNum], 'selected');
  }
}

function setCellClassName(cell, className) {
  cell.className = className;
  var child = cell.childNodes[0];
  if (child) child.className = className;
}

function setupPopupMenu() {
  document.onclick = hidePopupMenu;
  $('copy').onclick = copy;
  $('delete').onclick = del;
  $('insert').onclick = insert;
  $('move').onclick = move;
}

function copy() {
  console.log('copy entered');
}

function getColumnIndex(cell) {
  var index = -1;
  do {
    cell = cell.previousSibling;
    index++;
  } while (cell);
  return index;
}

function del() {
  var isColumn, text;

  text = popupTarget.innerText;
  isColumn = isNaN(parseInt(text, 10));

  if (isColumn) {
    deleteColumn();
  } else {
    deleteRow();
  }
}

function deleteColumn() {
  var cells, colNum, row, rowNum, rows, table;

  colNum = getColumnIndex(popupTarget);

  table = popupTarget.parentNode.parentNode;
  rows = table.childNodes;

  // For each row in the table ...
  for (rowNum = 0; rowNum < rows.length; rowNum++) {
    // Remove the appropriate cell.
    row = rows[rowNum];
    cells = row.childNodes;
    row.removeChild(cells[colNum]);
  }
}

function deleteRow() {
  var row = popupTarget.parentNode;
  row.parentNode.removeChild(row);
}

function insert() {
  var isColumn, table, text;

  table = popupTarget.parentNode.parentNode;
  text = popupTarget.innerText;
  isColumn = isNaN(parseInt(text, 10));

  if (isColumn) {
    insertColumn(table);
  } else {
    insertRow(table);
  }
}

function insertColumn(table) {
  var cell, cells, colNum, newCell, newColNum, row, rowNum, rows, text;

  newColNum = getColumnIndex(popupTarget);

  rows = table.childNodes;

  // For each row in the table ...
  for (rowNum = 0; rowNum < rows.length; rowNum++) {
    // Insert a new cell in the appropriate place.
    row = rows[rowNum];
    cells = row.childNodes;
    cell = cells[newColNum];
    newCell = makeCell(table, null, rowNum === 0);
    row.insertBefore(newCell, cell);
  }

  // Re-letter the columns starting from the new one.
  row = table.firstChild;
  cells = row.childNodes;
  for (colNum = newColNum; colNum < colCount; colNum++) {
    cell = cells[colNum];
    cell.innerText = cells[colNum + 1].innerText;
  }
  text = row.lastChild.innerText;
  row.lastChild.innerText = String.fromCharCode(text.charCodeAt(0) + 1);
}

function insertRow(table) {
  var newRow, newRowNum, row, rowNum, rows;

  row = popupTarget.parentNode;
  newRow = makeRow(table);
  table.insertBefore(newRow, row);

  // Renumber the rows starting from the new one.
  rows = table.childNodes;
  newRowNum = parseInt(popupTarget.innerText, 10);
  for (rowNum = newRowNum; rowNum < rows.length; rowNum++) {
    row = rows[rowNum];
    row.firstChild.innerText = rowNum;
  }
}

function makeCell(table, value, readOnly) {
  var cell, child;

  cell = document.createElement(readOnly ? 'th' : 'td');

  if (readOnly) {
    if (value) cell.innerText = value;
  } else {
    child = document.createElement('input');
    child.onfocus = deselectAll.bind(null, table);
    child.onkeypress = function (event) {
      if (event.keyCode === 13) {
        // Move focus to cell below this one.
      }
    };
    child.setAttribute('type', 'text');
    if (value) child.value = value;
    cell.appendChild(child);
  }

  return cell;
}

function makeRow(table, values, readOnly) {
  var cell, colNum, tr, rowNum, value;

  tr = document.createElement('tr');

  // Add row number cell.
  rowNum = table.childNodes.length;
  cell = makeCell(table, rowNum, true);
  tr.appendChild(cell);

  if (rowNum > 0) {
    // Setup click handling for row headings.
    cell.onclick = selectRow.bind(null, table, rowNum);
    cell.oncontextmenu = showPopupMenu;
  }

  // Add other cells.
  for (colNum = 1; colNum < colCount; colNum++) {
    value = values ? values[colNum] : null;
    cell = makeCell(table, value, readOnly);
    tr.appendChild(cell);
  }

  return tr;
}

function move() {
  console.log('move entered');
}

function showPopupMenu(event) {
  var isColumn, popup, target;

  popupTarget = event.target;

  popup = $('popup');
  popup.style.left = event.x + 'px';
  popup.style.top = event.y + 'px';
  popup.style.display = 'block';
  event.preventDefault();
}

window.onload = function () {
  var table = $('sheet');

  setupPopupMenu();

  addHeadingRow(table);
  addRow(table);
  addRow(table);
  addRow(table);
};
