// 1. Задача: Создание системы уведомлений
// Описание: Создайте класс Notification, который наследует EventEmitter. Класс должен обрабатывать разные типы уведомлений, такие как "получено сообщение", "запрос в друзья" и "системное оповещение".
// Требования:
// Добавьте свойства, такие как message, sender, и timestamp.
// Создайте методы для генерации различных событий, например, sendMessage(), sendFriendRequest(), и sendSystemAlert().
// Обработайте каждое событие с соответствующими сообщениями, например, "Новое сообщение от {sender}".
// Реализуйте обработку ошибок, например, если отсутствует отправитель или содержимое сообщения.

import { EventEmitter } from "events";

class Notification extends EventEmitter {
    constructor() {
        super();
        this.sender = null; // Инициализация отправителя
        this.message = null; // Инициализация текста сообщения
        this.timestamp = null; // Инициализация времени создания

        this.on("newMessage", (timestamp, sender, message) => {
            console.log(
                `${timestamp} New messege from ${sender}. Message content: ${message}`
            );
        });
        this.on("newFriendRequest", (timestamp, sender) => {
            console.log(
                `${timestamp} You have new friend request from ${sender}`
            );
        });
        this.on("newSystemAlert", (timestamp, message) => {
            console.log(timestamp, message);
        });
        this.on("error", (error) => {
            console.error(error);
        });
    }

    sendMessage(sender, message) {
        if (!sender || !message) {
            return this.emit(
                "error",
                new Error("No username or message here!")
            );
        }
        this.message = message;
        this.sender = sender;
        this.timestamp = new Date().toLocaleString();
        this.emit("newMessage", this.timestamp, sender, message);
    }

    sendFriendRequest(sender) {
        if (!sender) {
            return this.emit("error", new Error("No username here!"));
        }
        this.sender = sender;
        this.timestamp = new Date().toLocaleString();
        this.emit("newFriendRequest", this.timestamp, sender);
    }

    sendSystemAlert(message) {
        if (!message) {
            return this.emit("error", new Error("No message here!"));
        }
        this.message = message;
        this.timestamp = new Date().toLocaleString();
        this.emit("newSystemAlert", this.timestamp, message);
    }
}

const myNotification = new Notification();

myNotification.sendMessage("Valik", "Hi there!");
myNotification.sendFriendRequest("Bob");

setTimeout(() => {
    myNotification.sendSystemAlert("The system is ready for update!");
}, 2000);
