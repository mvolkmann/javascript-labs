function dump(name, iter) {
  console.log('values of', name, 'are');
  for (let v of iter) console.log(v);
}

let iter = {
  count: 0,
  [Symbol.iterator]() { return this; },
  next() {
    let i = ++this.count;
    return i <= 3 ? {value: i} : {done: true};
  }
};

dump('iter', iter);

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

dump('gen', gen());

console.log('obj is both iterable and iterator?',
  iter[Symbol.iterator].call(iter) === iter);
