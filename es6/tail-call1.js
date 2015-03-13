// Babel doesn't handle this tail call,
// maybe because the last position
// combines an operator with a recursive call.
function factorial(n) {
  return n <= 1 ? n : n * factorial(n - 1);
}

//console.log(factorial(5));
