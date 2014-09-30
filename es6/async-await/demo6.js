function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncValue(value) {
  await timeout(50);
  return value;
}

/*
(async function() {
  var value = await asyncValue(42);
  console.log('value =', value);
  assert.equal(42, value);
  done();
})();
*/

var value = await asyncValue(42);
console.log('value =', value);
