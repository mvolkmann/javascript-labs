async function doSomething(good) {
  if (good) return 'yes';
  throw new Error('bad');
}

async function demo() {
  try {
    let result = await doSomething(true);
    console.log('result =', result);
    result = await doSomething(false);
    console.log('result =', result);
  } catch (e) {
    console.error('error =', e.message);
  }
}

demo();
