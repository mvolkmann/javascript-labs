// This shows that let AND const create block scoped variables.
function foo() {
  {
    let x = 1;
    const y = 2;

    console.log('in block, x =', x);
    console.log('in block, y =', y);
  }

  //console.log('after block, x =', x);
  console.log('after block, y =', y);
}

foo();

console.log('out of foo, x =', x);
console.log('out of foo, y =', y);
