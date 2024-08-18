// Задача 3
// Напишите асинхронную функцию, которая будет выполнять бесконечный цикл while, ожидая выполнения промиса внутри цикла. Прервите цикл через 10 секунд, используя setTimeout, и используйте setImmediate для предотвращения блокировки цикла событий.

let isRunning = true;

setTimeout(() => {
    isRunning = false;
}, 50);

function setImidiatePromise() {
    return new Promise((resolve, reject) => {
        setImmediate(() => {
            resolve();
            console.log("resolved");
        });
    });
}

async function whileLoop() {
    while (isRunning) {
        console.log("While loop is running");
        await setImidiatePromise();
    }
}

whileLoop().then(() => console.log("Loop is ended"));
