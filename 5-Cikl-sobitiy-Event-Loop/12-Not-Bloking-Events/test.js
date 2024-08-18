function setImmediatePromise1() {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve();
            console.log("resolved 1");
        });
    });
}

function setImmediatePromise2() {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve();
            console.log("resolved 2");
        });
    });
}

function setImmediatePromise3() {
    return new Promise((resolve) => {
        setImmediate(() => {
            resolve();
            console.log("resolved 3");
        });
    });
}

async function whileLoop() {
    while (isRunning) {
        console.log(new Date().toLocaleTimeString(), "while loop");

        await setImmediatePromise1();
        await setImmediatePromise2();
        await setImmediatePromise3();
    }
}

let isRunning = true;

whileLoop();

// Остановка цикла через 5 секунд для демонстрации
setTimeout(() => {
    isRunning = false;
}, 5000);
