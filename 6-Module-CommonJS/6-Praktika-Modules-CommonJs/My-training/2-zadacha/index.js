const crazyFn = require("./advancedOperations");

const printFn = (fn, a, b) => {
    console.log(fn(a, b));
};

printFn(crazyFn, 1, 2);
