import express from "express";
import morgan from "morgan";
// import qs from "querystring";

const app = express();
//NPM пакет morgan - может логировать всю информацию от клиента (req)
app.use(morgan("tiny"));

//конвертирует JSON строку в JS Oject при методах POST,PUT, PATCH запросах
app.use(express.json());

//{extended: true} - мы говорим что хотим использевать именно внешний модуль что бы парсить формы
//{ extended: false } - будет использеваться встроенный модуль qs - query string (зависимость express)
app.use(express.urlencoded({ extended: true }));

//***********************************Парсинг формы от клиента вручную********* */
// app.use((req, res, next) => {
//     if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
//         let data = "";
//         req.on("data", (chunk) => (data += chunk.toString()));
//         req.on("end", () => {
//             const parsedFormData = qs.parse(data);
//             req.body = parsedFormData;
//             next();
//         });
//     } else {
//         next();
//     }
// });
//*************************************Ручная функция json()***************** */
// app.use((req, res, next) => {
//     let data = "";

//     //слушаем поступающий обьект в запросе
//     //затем добавляем полученный результат в переменную

//     req.on("data", (chunk) => (data += chunk));

//     req.on("end", () => {
//         const parsedJSON = JSON.parse(data);
//         req.body = parsedJSON;
//         //next - должен вызываться внутри ассинхронной функции иначе он вызоветься перед ней, он синхронный
//         next();
//     });
// });
//****************************************************************************** */

//*************************************Ручная функция логгер***************** */
// const logger = (req, res, next) => {
//     console.log(req.method, req.path);
//     next();
// };
// app.use(logger);
//***************************************************************************** */

app.use((req, res) => {
    console.log(req.body);
    return res.send("This is express server");
});

app.listen(5000, () => {
    console.log("Server launched on port 5000");
});
