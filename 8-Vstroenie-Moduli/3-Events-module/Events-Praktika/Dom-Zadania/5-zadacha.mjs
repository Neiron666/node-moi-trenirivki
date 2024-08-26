// Задание 5: Увеличение максимального количества слушателей.

// Создайте событие, у которого будет больше слушателей, чем разрешено по умолчанию (10 слушателей). Увеличьте лимит слушателей с помощью метода setMaxListeners и проверьте, что все слушатели срабатывают без ошибок. Попробуйте уменьшить лимит и посмотрите, что произойдет при попытке зарегистрировать больше слушателей, чем разрешено.

import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

myEmitter.on("myEvent", () => {
    console.log("1");
});
myEmitter.on("myEvent", () => {
    console.log("2");
});
myEmitter.on("myEvent", () => {
    console.log("3");
});
myEmitter.on("myEvent", () => {
    console.log("4");
});
myEmitter.on("myEvent", () => {
    console.log("5");
});
myEmitter.on("myEvent", () => {
    console.log("6");
});
myEmitter.on("myEvent", () => {
    console.log("7");
});
myEmitter.on("myEvent", () => {
    console.log("8");
});
myEmitter.on("myEvent", () => {
    console.log("9");
});
myEmitter.on("myEvent", () => {
    console.log("10");
});

myEmitter.setMaxListeners(12);

myEmitter.on("myEvent", () => {
    console.log("11");
});
myEmitter.on("myEvent", () => {
    console.log("12");
});

myEmitter.on("myEvent", () => {
    console.log("12");
});

myEmitter.emit("myEvent");
