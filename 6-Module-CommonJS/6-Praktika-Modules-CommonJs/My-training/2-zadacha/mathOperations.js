function addFn(a, b) {
    return a + b;
}
function subFn(a, b) {
    return a - b;
}
function multipleFn(a, b) {
    return a * b;
}
function devideFn(a, b) {
    return a / b;
}

const exportFn = {
    addFn,
    subFn,
    multipleFn,
    devideFn,
};

module.exports = exportFn;
