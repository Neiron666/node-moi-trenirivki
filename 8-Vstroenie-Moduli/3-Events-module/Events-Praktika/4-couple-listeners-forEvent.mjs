import { EventEmitter } from "events";

//создаем экземпляр класса EventEmitter и присваеваем его переменной myEmitter
const myEmitter = new EventEmitter();

//регистрация первого слушателя для события myEvent
myEmitter.on("myEvent", () => {
    console.log("First event listener");
});
//регистрация второго слушателя для события myEvent
myEmitter.on("myEvent", () => {
    console.log("Second event listener");
});

myEmitter.on("otherEvent", () => console.log("Other event"));

//setMaxListeners(25) - задаем максимально кол-во слушателей в имитре
myEmitter.setMaxListeners(25);

//getMaxListeners()- узнаем максимальное кол-во слушателей
console.log(myEmitter.getMaxListeners());

//смотрим список событий зарегестрированного для определенного имитра
console.log(myEmitter.eventNames());

setTimeout(() => myEmitter.emit("myEvent"), 1000);
