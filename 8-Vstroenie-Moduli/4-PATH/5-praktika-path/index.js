const path = require("path");

//Присваеваем абсолютный путь
const filePath = "/Users/bogdan/Desktop/node/index.js";
const textFilePath = "/Users/bogdan/Desctop/node/file.txt";

//Присваеваем относительный путь
const relativePath = "./node/movie.mov";

//Путь к папке без файла в ней
const directoryPath = "./node/subfolder";

//isAbsolute проверка на абсолютность пути
console.log(path.isAbsolute(filePath));
console.log(path.isAbsolute(relativePath));

//basename - возвращает последнюю часть пути
console.log(path.basename(filePath)); //index.js
console.log(path.basename(directoryPath)); //subfolder

//dirname - возвращает путь без названия файла
console.log(path.dirname(filePath), "dir name");
console.log(path.dirname(directoryPath));

//resolve - находим абсолютный путь к файлу
console.log(path.resolve(relativePath));

//extname-показывает расширениек файла
console.log(path.extname(textFilePath));
console.log(path.extname(relativePath));
console.log(path.extname(directoryPath));

//parse- разбивает путь на составляющие такие как, root, dir, base, ext, name.
console.log(path.parse(filePath));

//присваеваем обьект разбитый на части
const parsedPath = path.parse(filePath);

console.log(filePath);

//с помощью метода join соединяем пути, а так же меняем название пути
console.log(path.join(parsedPath.dir, `renamed-${parsedPath.name}.mjs`));
