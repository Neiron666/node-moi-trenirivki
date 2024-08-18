// Задача 2: Промисы и setImmediate
// Создайте программу, которая использует два промиса и два setImmediate.
// Убедитесь, что промисы выводятся первыми, а setImmediate - последними.
// Используйте process.nextTick внутри первого промиса.

function info(text) {
    console.log(`${text}`, performance.now().toFixed(2));
}

Promise.resolve().then(() => {
    info("promise 1");
    setImmediate(() => {
        info("SetImidiate 1 inside promise 1");
        process.nextTick(() => info("NextTick 1 inside promise 1"));
    });
});
Promise.resolve().then(() => {
    info("promise 2");
    setImmediate(() => info("SetImidiate 2 inside promise 2"));
});
