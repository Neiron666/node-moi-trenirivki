// 4. ПРИЛОЖЕНИЕ ДЛЯ ПРОСМОТРА ПРОДУКТОВ
// Цель: Создать простое приложение для управления списком товаров.

// Требования:

// Инициализируй проект и установи Express.
// Реализуй следующие маршруты:
// GET /products — список всех товаров.
// GET /products/:id — детальная информация о товаре.
// POST /products — добавление нового товара (поля: name, price).
// PUT /products/:id — редактирование информации о товаре.
// DELETE /products/:id — удаление товара.
// Храни товары в массиве.
// Раздели приложение на:
// Папку routes для маршрутов.
// Папку controllers для обработки запросов.

const express = require("express");
const router = require("./routes/index-router");

const app = express();

app.use(express.json());

app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
});
