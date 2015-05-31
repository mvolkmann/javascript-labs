let topLet = 'Am I global?';
var topVar = 'Am I global?';
console.log('topLet global?', topLet === global.topLet);
console.log('topVar global?', topVar === global.topVar);
//console.log('global =', global);

// This shows that let AND const create block scoped variables.
function foo() {
  {
    let x = 1;
    const y = 2;

    console.log('in block, x =', x);
    console.log('in block, y =', y);
  }

  //console.log('after block, x =', x); // not defined
  //console.log('after block, y =', y); // not defined
}

foo();

//console.log('out of foo, x =', x); // not defined
//console.log('out of foo, y =', y); // not defined
