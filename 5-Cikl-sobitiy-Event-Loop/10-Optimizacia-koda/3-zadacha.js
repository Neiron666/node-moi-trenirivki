// Задача 3: Интервалы и события ввода/вывода
// Используйте setInterval, чтобы выводить сообщение каждые 200 мс.
// Одновременно используйте dns.lookup для отправки DNS-запроса.
// Убедитесь, что сообщение от DNS-запроса выводится только один раз, между первым и вторым интервалами.

const dns = require("dns");

function info(text) {
    console.log(`${text}`, performance.now().toFixed(2));
}

let counter = 0;

const intervalId = setInterval(() => {
    info(`${(counter += 1)}`);
    if (counter === 1) {
        dns.lookup("localhost", (err, address, family) => info(address));
    }
    if (counter === 3) {
        clearInterval(intervalId);
    }
}, 200);
