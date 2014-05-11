'use strict';
/*global $: false, describe: false, expect: false, it: false,
  jasmine: false, loadFixtures: false */

describe('greet page', function () {
  it('displays greeting', function () {
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('index.html');

    $('#name').val('Mark');
    $('#greet').click();
    expect($('#greeting')).toHaveText('Hello, Mark!');
  });
});
