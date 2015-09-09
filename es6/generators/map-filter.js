// See your star-it library on Github for more.

function* map(iterable, fn) {
  for (let elem of iterable) {
    yield fn(elem);
  }
}

function* filter(iterable, fn) {
  for (let elem of iterable) {
    if (fn(elem)) yield elem;
  }
}

let arr = [1, 2, 3];
let double = x => x * 2;
let isOdd = x => x % 2;

console.log('doubled');
for (let elem of map(arr, double)) {
  console.log(elem);
}

console.log('\nodds');
for (let elem of filter(arr, isOdd)) {
  console.log(elem);
}
