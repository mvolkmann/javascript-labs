function objectEntries(obj) {
  var foo = 1;
  const bar = 2;
  let index = 0;
  let keys = Reflect.ownKeys(obj); // gets both string and symbol keys
  return { // note how iterable and iterator can be same object
    [Symbol.iterator]() { return this; },
    next() {
      if (index === keys.length) return {done: true};
      let k = keys[index++], v = obj[k];
      return {value: [k, v]};
    }
  };
}

let obj = {foo: 1, bar: 2, baz: 3};
for (let [k, v] of objectEntries(obj)) {
  console.log(k, 'is', v);
}
