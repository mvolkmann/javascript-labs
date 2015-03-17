(function () {
  'use strict';
  /*global angular: false */

  var addBtn, archiveBtn, list, todos = [],
    todosLengthSpan, todoTextInput,
    uncompletedCount = 0, uncompletedCountSpan;

  function addTodo() {
    createTodo({text: todoTextInput.value, done: false});
    todoTextInput.value = ''; // clears input
    addBtn.disabled = true;
  }

  function createTodo(todo) {
    var deleteBtn, checkbox, li, span, todoText;

    checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.done;
    checkbox.onchange = function () {
      todo.done = checkbox.checked;
      span.className = todo.done ? 'done-true' : '';
      uncompletedCount += todo.done ? -1 : 1;
      updateStats();
    };

    span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.done) {
      span.className = 'done-true';
    } else {
      uncompletedCount++;
    }

    deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = deleteTodo.bind(null, todo);

    li = document.createElement('li');
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    todo.li = li; // need later for deleting
    todos.push(todo);
    updateStats();
  }

  function archiveCompleted() {
    // Not saving completed todos in this version.
    todos = todos.filter(function (todo) {
      if (todo.done) removeItem(todo);
      return !todo.done;
    });
    updateStats();
  }

  function deleteTodo(todo) {
    removeItem(todo);
    if (!todo.done) uncompletedCount--;
    todos = todos.filter(function (t) { return t !== todo; });
    updateStats();
  }

  function removeItem(todo) {
    todo.li.parentNode.removeChild(todo.li);
  }

  function updateStats() {
    uncompletedCountSpan.textContent = uncompletedCount;
    todosLengthSpan.textContent = todos.length;
  }

  window.onload = function () {
    // Find all the DOM elements that will be needed later.
    uncompletedCountSpan =
      document.getElementById('uncompleted-count-span');
    todosLengthSpan = document.getElementById('todos-length-span');
    archiveBtn = document.getElementById('archive-btn');
    todoTextInput = document.getElementById('text-input');
    addBtn = document.getElementById('add-btn');
    list = document.getElementById('list');

    uncompletedCountSpan.textContent = 0;
    todosLengthSpan.textContent = 0;

    // Create initial todo items.
    createTodo({text: 'learn AngularJS', done: true});
    createTodo({text: 'build an AngularJS app', done: false});

    // Stop form submission from refreshing page.
    var form = document.getElementsByTagName('form')[0];
    form.onsubmit = function (event) {
      event.preventDefault();
    };

    // Disable "Add" button if no text has been entered.
    todoTextInput.onkeyup = function () {
      addBtn.disabled = !todoTextInput.value.length;
    };

    addBtn.onclick = addTodo;
    archiveBtn.onclick = archiveCompleted;
  };
})();
