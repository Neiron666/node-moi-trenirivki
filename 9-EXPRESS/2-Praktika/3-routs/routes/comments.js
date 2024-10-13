const express = require("express");
const {
    deleteSingleCommentHandler,
    getCommentsHandler,
    getSingleCommentHandler,
    postCommentsHandler,
} = require("../controllers/comments");

//express.Router() — это метод из Express.js, который создаёт новый объект маршрутизатора.
//С его помощью можно группировать несколько маршрутов и потом экспортировать их, чтобы использовать в основном сервере.
const router = express.Router();

// Внутри себя Express хранит эти маршруты как объекты, где ключ — это HTTP-метод и путь, а значение — функция-обработчик.
// router.get("/", getCommentsHandler), это фактически означает, что маршрутизатор добавляет новую запись для пути / и связывает её с функцией-обработчиком getCommentsHandler
router.get("/", getCommentsHandler);
router.post("/", postCommentsHandler);
//:commentId - в данном случае это вводимый нами параметр после слэша comments/ в URL строке
//Двоеточие (:) перед commentId говорит о том, что это динамический параметр маршрута.
router.get("/:commentId", getSingleCommentHandler);
router.delete("/:commentId", deleteSingleCommentHandler);

module.exports = router;
