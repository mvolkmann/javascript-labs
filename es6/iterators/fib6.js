let fibonacci = {
  [Symbol.iterator]() {
    let prev = 0, curr = 1, result = {done: false};
    return {
      next() {
        [prev, curr] = [curr, prev + curr];
        result.value = curr;
        return result;
      }
    }
  }
}

for (let n of fibonacci) {
  if (n > 100) break;
  console.log(n);
}
