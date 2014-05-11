'use strict';

window.onload = function () {
  var btn, event, header, input, select;

  header = document.getElementsByTagName('h3')[0];
  input = document.getElementById('name');
  select = document.getElementById('names');

  select.accessKey = 'n';

  changeColor();

  input.onkeypress = function (event) {
    if (event.keyCode !== 13) return;

    var option, text;

    text = document.createTextNode(input.value);
    if (text.length === 0) return;

    // Find the currently selected option and unselect it.
    option = select.querySelector('option[selected]');
    option.removeAttribute('selected');

    // Create a new option and make it selected.
    option = document.createElement('option');
    option.setAttribute('selected', 'selected');
    option.appendChild(text);
    select.appendChild(option);

    changeColor();
    input.value = '';
  };

  function changeColor() {
    header.style.color = select.value;
  }

  select.onchange = changeColor;

  btn = document.getElementById('b1');
  btn.onclick = function () {
    alert('You pressed the button!');
  };

  /*
  // Long way to simulate a click event.
  event = document.createEvent('UIEvents');
  event.initEvent('click', true, true);
  btn.dispatchEvent(event);
  */
  btn.click(); // short way
};
