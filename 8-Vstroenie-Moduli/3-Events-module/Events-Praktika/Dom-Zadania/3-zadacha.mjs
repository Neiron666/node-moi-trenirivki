// Задание 3: Отключение слушателей.

// Создайте событие с несколькими слушателями, но через определенное время отключите один из них с помощью метода off. Убедитесь, что оставшиеся слушатели продолжают реагировать на событие, в то время как отключенный слушатель больше не срабатывает.

import { EventEmitter } from "events";

const secondEventListener = () => {
    console.log("secondEventListener");
};

const myEmitter = new EventEmitter();

myEmitter.on("myEvent", () => {
    console.log("First event");
});

myEmitter.on("myEvent", secondEventListener);

myEmitter.on("myEvent", () => {
    console.log("Third event");
});

myEmitter.emit("myEvent");

myEmitter.off("myEvent", secondEventListener);

myEmitter.emit("myEvent");
