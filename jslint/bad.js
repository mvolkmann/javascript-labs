function foo() {
    a = 1; // undeclared variable
    bar(); // call to function that hasn't been defined yet
    var b = 2;
    var c = 3; // more than one var statement in function
    c = b // no terminating semicolon
    if (a + b == c) // == instead of ===
        console.log('equal'); // no braces around statement after if

  console.log('Hello'); // wrong indentation
}

function bar() {
    return true;
}
