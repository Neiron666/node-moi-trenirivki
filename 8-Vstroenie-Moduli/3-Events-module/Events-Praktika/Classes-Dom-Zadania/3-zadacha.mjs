// 3. Задача: Управление задачами в проекте
// Описание: Создайте класс TaskManager, который наследует EventEmitter, для управления задачами в проекте.
// Требования:
// Добавьте методы для создания задачи (createTask), завершения задачи (completeTask) и удаления задачи (deleteTask).
// При создании задачи генерируйте событие taskCreated, при завершении — taskCompleted, при удалении — taskDeleted.
// Реализуйте обработку событий с выводом информации о задачах.
// Добавьте обработку ошибок, если, например, задача не существует при попытке её завершения или удаления.

import { EventEmitter } from "events";

class TaskManager extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
        this.on("taskCreated", (taskName) => {
            this.tasks.push(taskName);
            console.log(`Task ${taskName} is created`);
        });
        this.on("taskCompleted", (taskName) => {
            this.tasks = this.tasks.filter((task) => task != taskName);
            console.log(`Task ${taskName} is completed`);
        });
        this.on("taskDeleted", (taskName) => {
            this.tasks = this.tasks.filter((task) => task != taskName);
            console.log(`Task ${taskName} is deleted`);
        });

        this.on("error", (error) => {
            console.error(error);
        });
    }

    createTask(taskName) {
        this.emit("taskCreated", taskName);
    }

    completeTask(taskName) {
        if (!taskName || !this.tasks.find((task) => task === taskName)) {
            return this.emit(
                "error",
                new Error(`Task "${taskName}" not found`)
            );
        }
        this.emit("taskCompleted", taskName);
    }

    deleteTask(taskName) {
        if (!taskName || !this.tasks.find((task) => task === taskName)) {
            return this.emit(
                "error",
                new Error(`Task "${taskName}" not found`)
            );
        }
        this.emit("taskDeleted", taskName);
    }
}

const myTaskManager = new TaskManager();

myTaskManager.createTask("reboot-computer");

myTaskManager.createTask("morning-wake-up");

myTaskManager.completeTask("reboot-computer");

myTaskManager.deleteTask("reboot-computer");

console.log(myTaskManager.tasks);
