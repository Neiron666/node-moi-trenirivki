let isRunning = true;

//До этой функции не дойдет, так как while блокирует поток соботий
setTimeout(() => (isRunning = false), 0);

process.nextTick(() => console.log("Next tick"));

//while - будет блокировать цикл событий, выводя все время одну и ту же надпись "While loop is running"
while (isRunning) {
    console.log(`While loop is running`);
}
