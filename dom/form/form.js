'use strict';

window.onload = function () {
  var form, name, listener;

  console.log('got onload');
  form = document.getElementById('myform');
  console.log('form =', form);
  form.style.borderColor = 'black';
  form.style.borderStyle = 'solid';
  form.style.borderWidth = '3px';
  console.log('form.addEventListener =', form.addEventListener);
  name = document.getElementById('name');

  listener = function (event) {
    console.log('name = "' + name.value + '"');
    console.log('name.length =', name.length);
    if (name.value.length === 0) event.preventDefault();

    // The following works as an alternative to event.preventDefault()
    // in every browser but IE.  I tested IE9.
    //if (name.value.length === 0) return false;
  };

  form.addEventListener('submit', listener);
  //form.onsubmit = listener;
};
