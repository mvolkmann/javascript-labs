'use strict';
/*jshint esnext: true */
function* haiku(){
  console.log('I kill an ant');
  yield 1;

  console.log('and realize my three children');
  yield 2;

  console.log('have been watching.');
  yield 3;

  console.log('- Kato Shuson');
}

let gen = haiku();
console.log(gen.next()); // I kill an ant
console.log(gen.next());
console.log(gen.next());
console.log(gen.next()); // - Kato Shuson
//gen.next(); // error
