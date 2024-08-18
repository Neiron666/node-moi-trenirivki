// //mjs file - означает что это ES6 модуль а не commonJs
// //module - не доступен в ES6 модуле
// console.log(module);

//{ season, temperature } - это не обьект а синтаксис импорт/экспорт ES6
import { season, temperature } from "./named-exports.mjs";
import { humidity, isRaining } from "./inline-exports.mjs";
import getDataFromServer from "./default-export.mjs";
import DEFAULT_SERVER, {
    PASSWORD as MY_PASSWORD,
    USERNAME as MY_USERNAME,
} from "./mixed-exports.mjs";

console.log(season, temperature);
console.log(humidity, isRaining);

getDataFromServer("https://jsonplaceholder.typicode.com/posts/1")
    .then((post) => console.log(post))
    .catch((err) => console.log(err));

console.log(DEFAULT_SERVER);
console.log(MY_USERNAME, MY_PASSWORD);
