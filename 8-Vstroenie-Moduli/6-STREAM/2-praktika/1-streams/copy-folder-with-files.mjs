import fs from "fs";
import path from "path";

const sourceDir = "./files";
const destinationDir = "./copied-files";
// Метод fs.existsSync() из модуля fs в Node.js используется для проверки существования файла или директории по указанному пути.
// Это синхронный метод, который возвращает true, если файл или директория существуют, и false, если их нет.
if (!fs.existsSync(sourceDir)) {
    //console.warn - Выводит сообщение в консоль с особым форматированием. В большинстве браузеров такие сообщения выделяются жёлтым цветом
    console.warn(`Source dir ${sourceDir} doesn't exist! `);
    console.log("Exiting...");
    //process.exit(0)- программа корректно завершает работу
    process.exit(0);
}

if (fs.existsSync(destinationDir)) {
    //rmSync - удаляем СИНХРОННО папку если она существует
    //{ recurcive: true} - позволит удалить все содержимое папки рекурсивно
    fs.rmSync(destinationDir, { recursive: true });
    console.log("destinationDir was removed");
}
//mkdirSync - make directory - создать папку
fs.mkdirSync(destinationDir);

//readdir - позволяет прочитать все файлы в определенной папке
//и возвращает массив имён файлов
fs.readdir(sourceDir, (err, fileNames) => {
    if (err) {
        console.log();
        //process.exit(1) - завершили программу с ошибкой
        process.exit(1);
    }

    console.log("Start", performance.now());

    //fileNames - массив который возвращает readdir
    //forEach - встроенный в массивы метод
    //fileName - при переборе массива будет содержать строку - имя файла
    fileNames.forEach((fileName, index) => {
        const sourceFilePath = path.join(sourceDir, fileName);
        const destinationFilePath = path.join(
            destinationDir,
            `${index + 1}. ${fileName}`
        );
        const readFileStream = fs.createReadStream(sourceFilePath);
        const writeFileStream = fs.createWriteStream(destinationFilePath);
        readFileStream.pipe(writeFileStream);

        writeFileStream.on("finish", () => {
            console.log(`File ${fileName} was copied`);
        });
    });
});

console.log("End", performance.now());
