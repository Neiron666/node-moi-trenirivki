// import stream from "stream";
import { Transform } from "stream";
import fs, { WriteStream } from "fs";

// const filePath = "./files/stdin-dump.txt";

// //Pipe to file
// const writeStream = fs.createWriteStream(filePath);
// //process - обьект со свойствами в Node.js
// //stdin - standart input from terminal
// //stdout - standart output in terminal
// //pipe - берет поток из ввода терминала и перенаправляет в поток stdout
// process.stdin.pipe(writeStream);

// //pipe to stdout
// process.stdin.pipe(process.stdout);

//в модуле stream есть класс транформ
//можно вызывать только сам Transform - import {Transform} from "stream";
//Transform() - вызываем функцию конструктор() кот-я ожидает обьект
//в обьекте должен был метод transform
const upperCaseStream = new Transform({
    transform: function (chunk, encoding, cb) {
        //chunk - в данном случае это буфер, и мы его конвертируем в строку
        const upperCased = chunk.toString().toUpperCase();

        //null-означает что ошибки не возникло
        //upperCased - второй аргумент, который означает данные
        cb(null, upperCased);
    },
});

const reverseStream = new Transform({
    transform(chunk, encoding, cb) {
        const arrayOfChars = chunk.toString().split("");
        //.pop()- убираем из массива и выводим последний эллемент - \n
        //так как автоматически при реверсе этот символ идет в начало строки
        const lastChar = arrayOfChars.pop();
        //затем переворачиваем массив, добвляем в конец символ переноса строки, и только потом превращаем масси в строку
        const reversedString = arrayOfChars.reverse().concat(lastChar).join("");
        //cb - возвращает из этого потока reversedString
        cb(null, reversedString);
    },
});

process.stdin.pipe(upperCaseStream).pipe(reverseStream).pipe(process.stdout);
