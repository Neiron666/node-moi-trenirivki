// Задача 4: Комбинация всех событий
// Создайте программу, которая использует все возможные типы событий: запись в файл, промисы, nextTick, setImmediate, таймеры, интервалы и события ввода/вывода.
// Настройте последовательность так, чтобы каждый тип события выводился в определённом порядке:
// Сначала nextTick
// Затем промисы
// Затем таймеры
// Затем запись в файл
// Затем интервалы
// Затем setImmediate
// И наконец, события ввода/вывода.

const fs = require("fs");
const dns = require("dns");

function info(text) {
    console.log(text, performance.now().toFixed(2));
}

Promise.resolve().then(() => info("Promise 1"));
Promise.resolve().then(() => info("Promise 2"));

process.nextTick(() => info("NextTick 1"));

setTimeout(() => {
    {
        info("Timer 0ms");
        setTimeout(() => {
            fs.writeFile("./4-zadacha.txt", "Hello zadacha 4", () =>
                info("File written")
            );
            info("Timer 20ms");
        }, 20);
    }
}, 0);

let counter = 0;

const intervalId = setInterval(() => {
    info(`SetInterval ${(counter += 1)}`);
    if (counter === 3) {
        setImmediate(() => {
            info("Setimidiate 1");
            dns.lookup("localhost", (err, address, family) => {
                info(`I/O ${address}`);
            });
        });

        clearInterval(intervalId);
    }
}, 200);
