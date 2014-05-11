System.register("../bar6", [], function() {
  "use strict";
  var __moduleName = "../bar6";
  'use strict';
  var bar1 = 'the value of bar1';
  function bar2() {
    console.log('in bar2');
  }
  return {
    get bar1() {
      return bar1;
    },
    get bar2() {
      return bar2;
    }
  };
});
System.register("../foo6", [], function() {
  "use strict";
  var __moduleName = "../foo6";
  'use strict';
  var $__0 = System.get("../bar6"),
      bar1 = $__0.bar1,
      bar2 = $__0.bar2;
  var foo1 = 'the value of foo1';
  console.log('foo6: bar1 =', bar1);
  function foo2() {
    console.log('in foo2');
    bar2();
  }
  return {
    get foo1() {
      return foo1;
    },
    get foo2() {
      return foo2;
    }
  };
});
'use strict';
var $__1 = System.get("../foo6"),
    foo1 = $__1.foo1,
    foo2 = $__1.foo2;
console.log('in main');
console.log('foo1 =', foo1);
foo2();

//# sourceMappingURL=main.map
