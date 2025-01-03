//"fs" расшифровывается как "file system" (файловая система).
//Это модуль в Node.js, который предоставляет API для работы с файловой системой, включая операции чтения, записи, изменения и удаления файлов и каталогов.
const fs = require("fs");

const dns = require("dns");

//performance.now() - это метод(функция), который показывает сколько времени прошло с запуска программы
//.toFixed(2) - округляем десятичные числа после точки до двух: 28.55648 => 28.55

function timestamp() {
    return performance.now().toFixed(2);
}

console.log("program start");

//*************Close events***********************************************************************************************

//fs.writeFile - запись файла.
//CLOSE EVENT - коллбэк функция вызываеться когда запись в файл закончено
//В скобках ожидает:первый аргумент - путь куда записать файл
//В скобках ожидает:второй аргумент - что записать в файл
//В скобках ожидает:третий аргумент - коллБэк функция, ассоциирована с событием конца записи файла

fs.writeFile("./test.txt", "Hello Node.js ...", () =>
    console.log("File written")
);

//*************Promises***********************************************************************************************

//Коллбэк функция внутри промиса будет вызвана когда это промисс будет успешно выполнен
//.resolve() - в данном случае этот промис уже успешно выполнен, поэтому Коллбэк функция будет вызвана
Promise.resolve().then(() => console.log("Promise 1", timestamp()));

//*************Next tick***********************************************************************************************

//process - глобальный обьект доступный в Node.js
//nextTick - метод в обьекте process
// у nextTick самый высокий приоритет, поэтому он выводиться сразу же в следующей итерации EventLoop после синхронных событий
process.nextTick(() => console.log("Next tick 1", timestamp()));

//*************setImmediate(chek событие)***********************************************************************************************

//setImmediate - ожидает получить только колБэк функцию
setImmediate(() => console.log("Immediate 1", timestamp()));

//*************Timeouts***********************************************************************************************
setTimeout(() => console.log("Timeout 1", timestamp()), 0);

setTimeout(() => {
    // nextTick - вызоветься после таймера, так как сначала обрабатываються таймера
    process.nextTick(() => console.log("Next tick 2", timestamp()));
    console.log("Timeout 2", timestamp());
}, 100);

//*************Intervals***********************************************************************************************

let intervalCount = 0;

const intervalId = setInterval(() => {
    console.log(`Interval ${(intervalCount += 1)}`, timestamp());
    if (intervalCount === 2) clearInterval(intervalId);
}, 50);

//*************I/O (Input/Output Events)***********************************************************************************************

// dns.lookup -  с помощью этого метода можно отправить DNS запрос
//первым аргументом нужно указать имя хоста
//второй аргумент коллБэк функция...
//коллБэк функция принимает 3 параметра:
//err-Объект ошибки (если ошибка произошла),
//address-Разрешенный IP-адрес, Например, для доменного имени google.com это может быть 172.217.3.110.
//family - указывает семейство адресов IP, к которому принадлежит разрешенный адрес, например "4" для IPv4 адресов. "6" для IPv6 адресов.
dns.lookup("localhost", (err, address, family) => {
    console.log("DNS 1 localhost", address, timestamp());
    Promise.resolve().then(() => console.log("Promise 2", timestamp()));
    process.nextTick(() => console.log("NextTick 3", timestamp()));
});
console.log("Program end");
