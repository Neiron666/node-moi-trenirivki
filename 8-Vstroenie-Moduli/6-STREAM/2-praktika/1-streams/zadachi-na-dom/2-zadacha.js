// Задача 2: Трансформация данных через поток
// Описание: Создайте поток Transform, который преобразует все гласные буквы в заглавные, а остальные оставляет без изменений.
// Требования:
// Используйте класс Transform из модуля stream.
// Реализуйте метод transform, который принимает буфер, преобразует его в строку и изменяет регистр гласных.
// Подключите этот поток между process.stdin и process.stdout.
// Программа должна продолжать работать до тех пор, пока пользователь не завершит ввод (например, через Ctrl + C).
// Добавьте обработку ошибок.

const { Transform } = require("stream");

// const inputLine = process.argv[2];

const vowelsRegex = /[aeiou]/g;

const vowelsToUpperCase = new Transform({
    transform: function (chunk, encoding, cb) {
        try {
            const updatedLine = chunk
                .toString()
                //vowelsRegex - первый аргумент метода replace ищет все совпадения в строке с помощью регулярного выражения
                //(vowel) -Когда второй аргумент — функция, она вызывается для каждого найденного совпадения.
                //vowel.toUpperCase()- каждый совпадающий c regex символ будет приведен в верхнему регистру
                .replace(vowelsRegex, (vowel) => vowel.toUpperCase());
            // В случае ошибки вызываем callback с первым аргументом error
            cb(null, updatedLine);
        } catch (error) {
            cb(error);
        }
    },
});

// Подключаем обработку ошибок на входном потоке
process.stdin.on("error", (err) => {
    console.error("Error on stdin:", err);
});

// Подключаем обработку ошибок на выходном потоке
process.stdout.on("error", (err) => {
    console.error("Error on stdout:", err);
});

// Обрабатываем ошибки в самом потоке Transform
vowelsToUpperCase.on("error", (err) => {
    console.error("Error in transform stream:", err);
});

process.stdin.pipe(vowelsToUpperCase).pipe(process.stdout);
