'use strict';

function bar() {
    return true;
}

function foo() {
    var a, b, c;
    a = 1;
    bar();
    b = 2;
    c = 3;
    c = b;
    if (a + b === c) {
        console('equal');
    }

    console('Hello');
}
