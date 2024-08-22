import { EventEmitter } from "events";

//создаем экземпляр класса EventEmitter и присваеваем его переменной myEmitter
const myEmitter = new EventEmitter();

//on = eventListener, т.е. регистрируем слушатель событий
//"timeout" = название события
//для каждого такого события будет вызыаться КБ функция зарагестрированна для этого события
myEmitter.on("timeout", (secondsQty) => {
    console.log(`Timeout event in ${secondsQty} seconds`);
});

//.emit - генерируем событие
setTimeout(() => {
    myEmitter.emit("timeout", 1);
}, 1000);
setTimeout(() => {
    myEmitter.emit("timeout", 2);
}, 2000);

//.once - регистрация одноразового события
myEmitter.once("singleEvent", () => {
    console.log("Single event occured");
});

//функция листенер будет вызвана только один раз
setTimeout(() => {
    myEmitter.emit("singleEvent");
}, 500);
setTimeout(() => {
    myEmitter.emit("singleEvent");
}, 1500);
