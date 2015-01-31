/*jshint esnext: true*/

let fibonacci = {
  [Symbol.iterator]() {
    let prev = 0, curr = 1, result = {done: false};
    return {
      next() {
        [prev, curr] = [curr, prev + curr];
        result.value = curr;
        return result;
      }
    };
  }
};

for (let n of fibonacci) {
  if (n > 100) break;
  console.log(n);
}

let fibonacciUsingGenerator = {
  * [Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
};

for (let n of fibonacciUsingGenerator) {
  if (n > 100) break;
  console.log(n);
}
