'use strict';
/*global $: false */

$(function () {
  var input = $('#name'), output = $('#greeting');
  $('#greet').click(function () {
    output.text('Hello, ' + input.val() + '!');
  });
});
