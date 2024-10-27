import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
//NPM пакет morgan - может логировать всю информацию от клиента (req)
app.use(morgan("tiny"));

//конвертирует JSON строку в JS Oject при методах POST,PUT, PATCH запросах
app.use(express.json());

//{extended: true} - мы говорим что хотим использевать именно внешний модуль что бы парсить формы
//{ extended: false } - будет использеваться встроенный модуль qs - query string (зависимость express)
app.use(express.urlencoded({ extended: true }));

//cors() - позволяя нашему серверу обрабатывать запросы от других доменов, отличных от домена сервера.
app.use(cors());

app.use((req, res) => {
    const personData = {
        name: "Valik",
        isStudent: true,
    };
    console.log(req.body);
    return res.json(personData);
});

app.listen(5000, () => {
    console.log("Server launched on port 5000");
});
