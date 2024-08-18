const fs = require("fs");

let isRunning = true;

//До этой функции не дойдет, так как while блокирует поток соботий
setTimeout(() => {
    (isRunning = false), console.log("Time out");
}, 0);

process.nextTick(() => console.log("Next tick"));

//без setImmediate мы застрянем на лупе собтытий, так как resolve() имеет приоритет перед другими видами событий
function setImidiatePromise() {
    return new Promise((resolve, reject) => {
        setImmediate(() => resolve());
    });
}

//while - будет блокировать цикл событий, выводя все время одну и ту же надпись "While loop is running"
//while в даном случае снхронная функция поэтому выполняеться сразу первой
//пока мы ожидаем (await setImidiatePromise()) - мы можем обрабатевать другие события
//async/await - синтаксическая надстройка над промисами
async function whileLoop() {
    while (isRunning) {
        console.log(`While loop is running`, performance.now().toFixed(2));
        await setImidiatePromise();
    }
}

whileLoop().then(() => console.log("While loop ended"));
