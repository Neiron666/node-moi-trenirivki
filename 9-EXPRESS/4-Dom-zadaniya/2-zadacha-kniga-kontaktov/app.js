// 2. ПРОСТАЯ КНИГА КОНТАКТОВ
// Цель: Создать мини-приложение для хранения контактов.
// Требования:
// Инициализируй проект и установи Express.
// Реализуй следующие маршруты:
// GET /contacts — список всех контактов.
// GET /contacts/:id — получить конкретный контакт по ID.
// POST /contacts — создать новый контакт (поля: name, phone, email).
// PUT /contacts/:id — обновить контакт по ID.
// DELETE /contacts/:id — удалить контакт по ID.
// Используй встроенный express.json() для обработки тела запросов.
// Храни контакты в массиве.
// Раздели приложение на:
// Папку routes для маршрутов.
// Папку controllers для логики обработки.

const express = require("express");
const router = require("./routes/index");
const app = express();

app.use(express.json()); // Добавляет поддержку JSON-тел запросов

app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
});
