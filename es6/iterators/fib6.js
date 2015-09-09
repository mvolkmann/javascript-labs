/*jshint esnext: true*/

const fib = {
  [Symbol.iterator]() {
    let n1 = 0, n2 = 1, value;
    return {
      next() {
        [value, n1, n2] = [n1, n2, n1 + n2];
        return {value};
      }
    };
  }
};

// This version uses a trick to avoid skippin first two numbers.
// The first two calls are slower, but the rest are as fast as
// possible because they don't have any conditional logic.
const fib2 = {
  [Symbol.iterator]() {
    let prev = 0, curr = 1;
    return {
      next() {
        this.next = () => {
          this.next = () => {
            [prev, curr] = [curr, prev + curr];
            return {value: curr};
          };
          return {value: curr};
        };
        return {value: prev};
      }
    };
  }
};

for (const n of fib) {
  if (n > 100) break;
  console.log(n);
}

const fibWithGenerator = {
  * [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    yield prev;
    yield curr;
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
};

for (const n of fibWithGenerator) {
  if (n > 100) break;
  console.log(n);
}
