const { addFn, subFn, multipleFn, devideFn } = require("./mathOperations");

const crazyFn = (a, b) => {
    return addFn(a, b) + subFn(a, b) + multipleFn(a, b) + devideFn(a, b);
};

module.exports = crazyFn;
