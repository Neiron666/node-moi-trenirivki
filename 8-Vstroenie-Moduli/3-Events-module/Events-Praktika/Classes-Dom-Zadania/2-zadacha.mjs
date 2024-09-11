// 2. Задача: Чат-комната с несколькими пользователями
// Описание: Разработайте класс ChatRoom, который наследует EventEmitter, представляющий чат-комнату, в которую могут присоединяться пользователи, покидать её и отправлять сообщения.
// Требования:
// Создайте методы join(userName), leave(userName) и sendMessage(userName, message).
// Обрабатывайте события join, leave, и messageReceived, выводя соответствующие сообщения в консоль.
// Реализуйте логику, которая позволяет отследить, какие пользователи сейчас в чате.
// Добавьте обработку ошибок, если пользователь пытается отправить сообщение, не присоединившись к комнате.

// Импортируем класс EventEmitter из модуля "events"
import { EventEmitter } from "events";

// Определяем класс ChatRoom, который наследует EventEmitter для обработки событий в чате
class ChatRoom extends EventEmitter {
    constructor() {
        super(); // Вызываем конструктор родительского класса (EventEmitter)
        this.onlineUsers = []; // Массив для отслеживания пользователей, находящихся в чате

        // Обработчик события, когда пользователь присоединяется к чату
        this.on("join", (timestamp, userName) => {
            // Добавляем пользователя в массив онлайн-пользователей
            this.onlineUsers.push(userName);

            // Выводим сообщение о присоединении, количестве пользователей и их именах
            console.log(
                timestamp,
                `${userName} присоединился к нашему чату!\nСейчас в чате ${
                    this.onlineUsers.length
                } пользователей онлайн:\n${this.onlineUsers.join("\n")}`
            );
        });

        // Обработчик события, когда пользователь покидает чат
        this.on("leave", (timestamp, userName) => {
            // Удаляем пользователя из массива онлайн-пользователей
            this.onlineUsers = this.onlineUsers.filter(
                (user) => user !== userName
            );

            // Выводим сообщение об уходе, количестве пользователей и их именах
            console.log(
                timestamp,
                `${userName} покинул наш чат!\nСейчас в чате ${
                    this.onlineUsers.length
                } пользователей онлайн:\n${this.onlineUsers.join("\n")}`
            );
        });

        // Обработчик события, когда пользователь отправляет сообщение
        this.on("sendMessage", (timestamp, userName, message) => {
            // Выводим сообщение с именем пользователя и содержимым сообщения
            console.log(
                timestamp,
                `Сообщение от ${userName}, содержание:\n${message}`
            );
        });

        // Обработчик ошибок, выводящий сообщение об ошибке в консоль
        this.on("error", (error) => console.error(error));
    }

    // Метод для присоединения пользователя к чату
    join(userName) {
        this.timestamp = new Date().toLocaleString(); // Получаем текущее время
        this.emit("join", this.timestamp, userName); // Генерируем событие "join"
    }

    // Метод для выхода пользователя из чата
    leave(userName) {
        this.timestamp = new Date().toLocaleString(); // Получаем текущее время
        this.emit("leave", this.timestamp, userName); // Генерируем событие "leave"
    }

    // Метод для отправки сообщения в чат
    sendMessage(userName, message) {
        // Проверяем, что пользователь зарегистрирован в чате
        if (!this.onlineUsers.find((user) => user === userName)) {
            // Если пользователь не найден, генерируем событие "error"
            return this.emit(
                "error",
                new Error("Пользователь не зарегистрирован в чате")
            );
        }

        // Проверяем, что сообщение не пустое
        if (!message) {
            // Если сообщение пустое, генерируем событие "error"
            return this.emit("error", new Error("Сообщение не получено"));
        }

        this.timestamp = new Date().toLocaleString(); // Получаем текущее время
        this.emit("sendMessage", this.timestamp, userName, message); // Генерируем событие "sendMessage"
    }
}

// Создаем экземпляр класса ChatRoom
const myChatRoom = new ChatRoom();

// Пример использования методов класса
myChatRoom.join("Bob"); // Пользователь Bob присоединяется к чату
myChatRoom.join("Nick"); // Пользователь Nick присоединяется к чату
myChatRoom.join("Billi"); // Пользователь Billi присоединяется к чату
myChatRoom.join("David"); // Пользователь David присоединяется к чату

myChatRoom.leave("Bob"); // Пользователь Bob покидает чат

// Отправка сообщений от пользователей
myChatRoom.sendMessage("Nick", "Привет, как дела?");
myChatRoom.sendMessage("David", "Привет, пошли в клуб");
myChatRoom.sendMessage("David"); // Попытка отправить пустое сообщение вызывает ошибку
