import { EventEmitter } from "events";

//создаем экземпляр класса EventEmitter и присваеваем его переменной myEmitter
const myEmitter = new EventEmitter();

//on = eventListener, т.е. регистрируем слушатель событий
//"timeout" = название события
//для каждого такого события будет вызыаться КБ функция зарагестрированна для этого события
myEmitter.on("timeout", () => {
    console.log("Timeout event!");
});

//.emit - генерируем событие
setTimeout(() => {
    myEmitter.emit("timeout");
}, 1000);
setTimeout(() => {
    myEmitter.emit("timeout");
}, 2000);
