// 5. Приложение с пользовательскими отзывами
// Цель: Создать приложение для управления отзывами пользователей.

// Требования:

// Инициализируй проект и установи Express.
// Реализуй следующие маршруты:
// GET /reviews — список всех отзывов.
// GET /reviews/:id — детальная информация о конкретном отзыве.
// POST /reviews — добавление нового отзыва (поля: author, content).
// PUT /reviews/:id — обновление отзыва.
// DELETE /reviews/:id — удаление отзыва.
// Храни отзывы в массиве.
// Раздели код на:
// Папку routes для маршрутов.
// Папку controllers для логики работы с отзывами.

const express = require("express");
const router = require("./routes/index");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
});
