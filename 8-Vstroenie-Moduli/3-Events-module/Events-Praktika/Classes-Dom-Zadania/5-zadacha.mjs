// 5. Задача: Система отслеживания заказов
// Описание: Создайте класс OrderTracker, который наследует EventEmitter, для отслеживания заказов в системе.
// Требования:
// Реализуйте методы для создания заказа (createOrder), обновления статуса заказа (updateStatus) и отмены заказа (cancelOrder).
// Обрабатывайте события orderCreated, statusUpdated, и orderCanceled.
// Добавьте возможность следить за статусами заказов и оповещать о них.
// Реализуйте обработку ошибок, например, при попытке обновления статуса несуществующего заказа.

import { EventEmitter } from "events";

class OrderTracker extends EventEmitter {
    constructor() {
        super();
        // Объект для хранения заказов и их статусов
        this.orderList = {};
        // Возможные статусы заказа
        this.orderStatuses = ["created", "inTransit", "completed"];

        // Событие при создании заказа
        this.on("orderCreated", (orderName, orderStatus) => {
            this.orderList[orderName] = orderStatus;
            console.log(
                `Order with name "${orderName}" is created with status "${orderStatus}".`
            );
        });

        // Событие при обновлении статуса заказа
        this.on("statusUpdated", (orderName, orderStatus) => {
            this.orderList[orderName] = orderStatus;
            console.log(
                `Order with name "${orderName}" is updated to status "${orderStatus}".`
            );
        });

        // Событие при отмене заказа
        this.on("orderCanceled", (orderName) => {
            delete this.orderList[orderName];
            console.log(`Order with name "${orderName}" is canceled.`);
        });

        // Обработка ошибок
        this.on("error", (error) => {
            console.error(error.message);
        });
    }

    // Метод для создания нового заказа
    createOrder(orderName, orderStatus) {
        // Проверка корректности входных данных и статуса
        if (
            !orderName ||
            !orderStatus ||
            !this.orderStatuses.includes(orderStatus)
        ) {
            return this.emit("error", new Error("Invalid order status."));
        }
        // Проверка, существует ли заказ с таким именем
        if (this.orderList[orderName]) {
            return this.emit(
                "error",
                new Error(`Order "${orderName}" already exists.`)
            );
        }
        // Генерация события создания заказа
        this.emit("orderCreated", orderName, orderStatus);
    }

    // Метод для обновления статуса существующего заказа
    updateStatus(orderName, orderStatus) {
        // Проверка существования заказа и корректности статуса
        if (!(orderName in this.orderList)) {
            return this.emit(
                "error",
                new Error(`Order "${orderName}" not found.`)
            );
        }
        if (!orderStatus || !this.orderStatuses.includes(orderStatus)) {
            return this.emit("error", new Error("Invalid order status."));
        }
        // Генерация события обновления статуса заказа
        this.emit("statusUpdated", orderName, orderStatus);
    }

    // Метод для отмены существующего заказа
    cancelOrder(orderName) {
        // Проверка существования заказа
        if (!orderName || !(orderName in this.orderList)) {
            return this.emit(
                "error",
                new Error(`Order "${orderName}" not found.`)
            );
        }
        // Генерация события отмены заказа
        this.emit("orderCanceled", orderName);
    }
}

// Пример использования класса OrderTracker
const myOrderTracker = new OrderTracker();

myOrderTracker.createOrder("potatos", "created");
myOrderTracker.createOrder("watermelon", "created");
myOrderTracker.updateStatus("watermelon", "inTransit");

myOrderTracker.createOrder("carrot", "created");

console.log(myOrderTracker.orderList);
myOrderTracker.cancelOrder("carrot");

console.log(myOrderTracker.orderList);
