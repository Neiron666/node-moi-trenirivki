// console.log(process.argv);
//если не ввели 2-й или 3-й агрумента

import fs from "fs";
import path from "path";

if (!process.argv[2] || !process.argv[3]) {
    console.log("Filename and lines qty must be supplied as arguments");
    // process.exit() — эта функция немедленно завершает процесс Node.js.
    // Когда она вызывается, выполнение кода прекращается, и программа завершает работу.
    // 0 — означает, что программа завершилась успешно, без ошибок.
    //Любое другое число (например, 1, 2, и т.д.) — сигнализирует, что произошла ошибка или программа завершилась с неудачей.
    process.exit(0);
}

const fileName = process.argv[2];
const linesQty = parseInt(process.argv[3]);

//isNaN-проверяет если не номер
if (isNaN(linesQty)) {
    console.log("Lines qty must be a number");
    process.exit(0);
}

const writeStream = fs.createWriteStream(path.join("./files", fileName));

//*************Этот цикл блокирует event loop************** */
//Проверим блокировку с помощью
console.log("start", performance.now());

for (let i = 1; i <= linesQty; i++) {
    writeStream.write(
        `This is a line number${i} in the automaticaly generated file\n`
    );
}

console.log("end", performance.now());

setTimeout(() => {
    console.log("Timeout", performance.now());
}, 0);

writeStream.end(() => {
    console.log(
        `Automatically generated file ${fileName} with ${linesQty} lines was created`
    );
});

//пишем в терминале, и все это будет аргументами в массиве [] process.argv
//у каждого аргумента будет свое порядковое место

//***************************КАК ЗАПУСКАТЬ ПРОГРАММУ*********************** */

//node createfile.mjs <filename> <linesQty

//                                 -- ИЛИ --                                        */

//node createfile.mjs file.txt 1000 // путь к исполняемому файлу Node.js.

//*******************ОТВЕТ ЧТО ПОЛУЧИМ В ТЕРМИНАЛЕ************************
// [
//     "C:\\Program Files\\nodejs\\node.exe",//путь к исполняемому файлу argv[0]
//     "D:\\UDEMI\\node-moi-trenirivki\\8-Vstroenie-Moduli\\6-STREAM\\2-praktika\\1-streams\\createfile.mjs",//абсолютный путь к этому файлу argv[1]
//     "file.txt",//название файла argv[2]
//     "1000",//число argv[3]
// ];
