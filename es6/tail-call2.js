// Babel does handle this tail call!
function fac(n, acc) {
  return n == 0 ? acc : fac(n - 1, acc * n);
}

function factorial(n) {
  return fac(n, 1);
}

console.log(factorial(5));
