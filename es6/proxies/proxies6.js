// At the time this was written, only Firefox supported proxies.
// However, there were other ES6 features,
// such as "let" and enhanced object literals,
// that it did not support.
var obj = {
  p1: 'some value',
  m1: () => 'm1 result',
  m2: () => 'm2 result'
};

var proxy = new Proxy(obj, {
  get: (target, key) => {
    console.log('intercepted get for key =', key);
    var value = target[key];
    return value === undefined ? () => 'missing method ' + key :
      typeof value === 'string' ? value.toUpperCase() :
      value;
  },
  set: (target, key, value) => {
    console.log('intercepted set for key =', key);
    target[key] = value;
  }
});

// Replace a method on obj with a proxy for it.
obj.m1 = new Proxy(obj.m1, {
  apply: (fn, target, args) => {
    console.log('intercepted call to function', fn);
    var result = fn.apply(target, args);
    return typeof result === 'string' ? result.toUpperCase() : value;
  }
});

proxy.p1 = 'other value';
console.log('proxy.p1 =', proxy.p1);
console.log('obj.p1 =', obj.p1);

console.log('proxy.m1() =', proxy.m1()); // has a proxy
console.log('proxy.m2() =', proxy.m2()); // doesn't have a proxy

console.log(proxy.makeMeUpOnTheFly());

// This demonstates that calling a method on a proxy
// that it doesn't have just forwards to the target object.
var proxy2 = new Proxy(obj, {});
console.log(proxy2.m2()); // m2 result
