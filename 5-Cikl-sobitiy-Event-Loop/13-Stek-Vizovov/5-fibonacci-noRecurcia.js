//fibonacci - это сумма двух предыдущих чисел
//fibonacci- 0,1,1,2,3,5,8,13,21,34,55...
function info(text) {
    console.log(`${text}`, performance.now().toFixed(2));
}

info("Programs Start");

setTimeout(() => {
    info("Timeout");
}, 0);

//Здесь функция fib синхронная, поэтому сначая выполняеться она и только на следующей итерации тайм-ауты
function fib(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    let fib1 = 0;
    let fib2 = 1;
    let sum;

    for (let i = 1; i < n; i++) {
        sum = fib1 + fib2;
        fib1 = fib2;
        fib2 = sum;
    }
    return sum;
}

console.log(fib(1000));

info("Programs End");
