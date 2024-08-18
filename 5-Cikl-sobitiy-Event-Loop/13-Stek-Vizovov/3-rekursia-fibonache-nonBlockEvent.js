//fibonacci - это сумма двух предыдущих чисел
//fibonacci- 0,1,1,2,3,5,8,13,21,34,55...
const fs = require("fs");
//Будет вызван только после реализации синхронной функции fib()
setTimeout(() => {
    console.log("Timeout");
}, 0);

function fib(n) {
    return new Promise((resolve, reject) => {
        if (n === 0 || n === 1) {
            return resolve(n);
        }
        //setImmediate- даёт возможность перейти на следующую итерацию не блокируя цикл событий и вывести setTimeout в первую очередь
        setImmediate(() =>
            Promise.all([fib(n - 1), fib(n - 2)]).then(([fib1, fib2]) =>
                resolve(fib1 + fib2)
            )
        );
    });
}

//heap out of memory
fib(3).then((res) => console.log(res));
