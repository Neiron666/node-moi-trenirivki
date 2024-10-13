// import * as dotenv from "dotenv"; - так загружаем все что импортируеться из модуля в одну переменную
// .config() - используется в Node.js для подключения и настройки библиотеки dotenv,
// которая позволяет работать с переменными среды (environment variables) из файла .env.
// import { config } from "dotenv";
// config();
import dotenv from "dotenv";
dotenv.config();

console.log(dotenv.config);

// выводит в консоль все переменные среды, которые доступны в вашем приложении.
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_URL);
console.log(process.env.DB_PASSWORD);
// console.log(process.env);
