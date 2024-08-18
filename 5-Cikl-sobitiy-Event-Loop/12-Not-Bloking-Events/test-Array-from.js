const array = Array.from({ length: 2 }, () => Math.floor(Math.random() * 100));

function sumArray(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
}

console.log(array, sumArray(array));
