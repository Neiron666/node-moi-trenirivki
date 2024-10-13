// 1. МИНИ-API ДЛЯ УПРАВЛЕНИЯ ЗАДАЧАМИ
// Цель: Создать приложение с CRUD операциями для управления задачами (to-do list).
// Инициализируй новый проект с npm init и установи Express.
// Приложение должно поддерживать следующие маршруты:
// GET /tasks — возвращает список всех задач (JSON).
// GET /tasks/:id — возвращает конкретную задачу по ID.
// POST /tasks — добавляет новую задачу (принимает JSON с полями: title, description).
// PUT /tasks/:id — обновляет задачу по ID (принимает JSON с полями: title, description).
// DELETE /tasks/:id — удаляет задачу по ID.
// Раздели код на:
// Папку routes для маршрутов.
// Папку controllers для логики работы с задачами.
// Основной файл приложения app.js.

const express = require("express");
const router = require("./routes/index");
const app = express();
app.use(express.json()); // Добавляет поддержку JSON-тел запросов

app.use(router);

app.listen(3000, () => {
    console.log("Server launched on port 3000");
});
