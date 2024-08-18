//fibonacci - это сумма двух предыдущих чисел
//fibonacci- 0,1,1,2,3,5,8,13,21,34,55...

const fs = require("fs");

setTimeout(() => {
    console.log("Timeout");
}, 0);

//"Map" в JavaScript представляет собой коллекцию ключ-значение, аналогичную объекту
//Любой тип данных может быть ключом: В отличие от объектов, где ключи могут быть только строками или символами
//в Map можно использовать любые типы данных (объекты, функции и т.д.) в качестве ключей.
//Порядок вставки сохраняется: В Map элементы перебираются в порядке их вставки.
//Размер коллекции: Метод size возвращает количество элементов в Map.
const cache = new Map();

function fib(n) {
    return new Promise((resolve, reject) => {
        if (n === 0 || n === 1) {
            return resolve(n);
        }
        if (cache.has(n)) {
            return resolve(cache.get(n));
        }
        //setImmediate- даёт возможность перейти на следующую итерацию не блокируя цикл событий и вывести setTimeout в первую очередь
        setImmediate(() =>
            fib(n - 1).then((fib1) =>
                fib(n - 2).then((fib2) => {
                    cache.set(n, fib1 + fib2);
                    resolve(fib1 + fib2);
                })
            )
        );
    });
}

fib(100000).then((res) => console.log(res));
