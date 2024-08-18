// Задача 3: Вложенные асинхронные вызовы
// Описание:

// Выведите в консоль Start Task 3.
// Создайте таймер с задержкой 10 мс, который выведет Outer Timer 10ms и внутри него создайте другой таймер с задержкой 5 мс, который выведет Inner Timer 5ms.
// Создайте промис, который выполнится через 0 мс и выведет Promise 0ms.
// Внутри коллбэка промиса создайте process.nextTick, который выведет Next tick inside promise.
// В конце выведите в консоль End Task 3.

function TimeStamp() {
    return performance.now().toFixed(2);
}

console.log("Start Task 3", TimeStamp());

setTimeout(() => {
    console.log("Outer Timer 10ms", TimeStamp());
    setTimeout(() => {
        console.log("Inner Timer 5ms", TimeStamp());
    }, 5);
}, 10);

Promise.resolve().then(() => {
    console.log("Promise 0ms", TimeStamp());
    process.nextTick(() =>
        console.log("Next tick inside promise", TimeStamp())
    );
});

console.log("End Task 3", TimeStamp());
