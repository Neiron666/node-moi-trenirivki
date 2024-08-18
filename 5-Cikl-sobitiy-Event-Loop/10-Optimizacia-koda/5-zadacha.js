// Задача 5: Сложные зависимости
// Создайте программу, где одно событие зависит от выполнения другого.
// Используйте setTimeout для создания задержки.
// Запишите данные в файл, затем используйте dns.lookup.
// Выведите сообщения в порядке: таймер, запись в файл, DNS-запрос, промис, nextTick, setImmediate.

// Для задачи 5 вам нужно настроить порядок выполнения событий, чтобы они происходили в следующей последовательности:

// Таймеры: Используйте setTimeout для создания начальной задержки.
// Запись в файл: После завершения таймера, выполните операцию записи в файл.
// DNS-запрос: После завершения записи в файл, выполните запрос DNS.
// Промисы: Создайте промисы, чтобы вывести сообщения после завершения всех предыдущих операций.
// process.nextTick: Используйте process.nextTick для выполнения кода сразу после завершения текущего стека.
// setImmediate: Вызовите setImmediate, чтобы убедиться, что этот код выполнится после всех предыдущих операций.

const fs = require("fs");
const dns = require("dns");
const { nextTick } = require("process");

function info(text) {
    console.log(text, performance.now().toFixed(2));
}

setTimeout(() => {
    info("Timer");
    fs.writeFile("./5-zadacha.txt", "Hello Zadacha 5", () => {
        info("File written");
        dns.lookup("localhost", (err, address, family) => {
            info(`DNS ${address}`);
            Promise.resolve().then(() => {
                info("Promise");
                nextTick(() => info("NextTick"));
                setImmediate(() => info("SetImidiate"));
            });
        });
    });
}, 100);
