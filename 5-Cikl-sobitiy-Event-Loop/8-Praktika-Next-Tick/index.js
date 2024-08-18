//"fs" расшифровывается как "file system" (файловая система).
//Это модуль в Node.js, который предоставляет API для работы с файловой системой, включая операции чтения, записи, изменения и удаления файлов и каталогов.
const fs = require("fs");

//performance.now() - это метод(функция), который показывает сколько времени прошло с запуска программы
//.toFixed(2) - округляем десятичные числа после точки до двух: 28.55648 => 28.55

function timestamp() {
    return performance.now().toFixed(2);
}

console.log("program start");

setTimeout(() => console.log("Timeout 1", timestamp()), 0);

setTimeout(() => {
    console.log("Timeout 2", timestamp());
}, 10);

//fs.writeFile - запись файла.
//CLOSE EVENT - коллбэк функция вызываеться когда запись в файл закончено
//В скобках ожидает:первый аргумент - путь куда записать файл
//В скобках ожидает:второй аргумент - что записать в файл
//В скобках ожидает:третий аргумент - коллБэк функция, ассоциирована с событием конца записи файла

fs.writeFile("./test.txt", "Hello Node.js ...", () =>
    console.log("File written")
);

//Коллбэк функция внутри промиса будет вызвана когда это промисс будет успешно выполнен
//.resolve() - в данном случае этот промис уже успешно выполнен, поэтому Коллбэк функция будет вызвана
Promise.resolve().then(() => console.log("Promise 1", timestamp()));

//process - глобальный обьект доступный в Node.js
//nextTick - метод в обьекте process
// у nextTick самый высокий приоритет, поэтому он выводиться сразу же в следующей итерации EventLoop после синхронных событий
process.nextTick(() => console.log("Next tick 1", timestamp()));

//setImmediate - ожидает получить только колБэк функцию
setImmediate(() => console.log("Immediate 1", timestamp()));

console.log("Program end");
