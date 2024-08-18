function one() {
    return 10;
}

function two() {
    return one() + 10;
}

function three() {
    return two() + 10;
}

console.log(three());
