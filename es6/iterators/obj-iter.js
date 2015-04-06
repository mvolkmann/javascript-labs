// Using a custom iterator
function objectEntries(obj) {
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

// Using a generator
function* objectEntries2(obj) {
  let keys = Reflect.ownKeys(obj); // gets both string and symbol keys
  for (let key of keys) yield([key, obj[key]]);
}

let obj = {foo: 1, bar: 2, baz: 3};

for (let [k, v] of objectEntries(obj)) {
  console.log(k, 'is', v);
}

for (let [k, v] of objectEntries2(obj)) {
  console.log(k, 'is', v);
}
