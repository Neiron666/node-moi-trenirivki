// 3. ПРОСТОЕ ПРИЛОЖЕНИЕ ДЛЯ ЗАМЕТОК
// Цель: Создать приложение для управления заметками.

// Требования:

// Инициализируй проект и установи Express.
// Реализуй следующие маршруты:
// GET /notes — список всех заметок.
// GET /notes/:id — получить конкретную заметку по ID.
// POST /notes — создать новую заметку (поля: title, content).
// PUT /notes/:id — обновить заметку по ID.
// DELETE /notes/:id — удалить заметку по ID.
// Сохраняй данные о заметках в массиве.
// Раздели приложение на routes и controllers.

const express = require("express");
const router = require("./routes/index-router");
const app = express();
app.use(express.json());

app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT}`);
});
