// 4. Задача: Учет подписок на новости
// Описание: Разработайте класс NewsSubscription, который наследует EventEmitter и позволяет пользователям подписываться на различные категории новостей и получать уведомления.
// Требования:
// Добавьте методы subscribe(user, category) и unsubscribe(user, category).
// Реализуйте событие newsPublished, которое уведомляет подписчиков о новой новости в их категории.
// Обрабатывайте ошибки, если пользователь пытается отписаться от категории, на которую он не подписан.

import { EventEmitter } from "events";

class NewsSubscription extends EventEmitter {
    constructor() {
        super();
        this.categories = {
            sportCategory: [],
            foodCategory: [],
        };

        // Событие публикации новости в категории
        this.on("newsPublished", (category, categoryName) => {
            category.forEach((user) =>
                console.log(
                    `Hello ${user}, here is a new publication in "${categoryName.toLowerCase()}"`
                )
            );
        });

        // Событие подписки на категорию
        this.on("subscribe", (user, category) => {
            category.push(user);
            console.log(`${user} subscribed successfully to category.`);
        });

        // Событие отписки от категории
        this.on("unsubscribe", (user, categoryName) => {
            this.categories[categoryName] = this.categories[
                categoryName
            ].filter((userName) => userName !== user);
            console.log(`User ${user} has successfully unsubscribed.`);
        });

        // Обработка ошибок
        this.on("error", (error) => console.error(error));
    }

    // Метод подписки на категорию
    subscribe(user, category) {
        const formattedCategory = category.split(" ").join("");
        if (!this.categories[formattedCategory]) {
            return this.emit(
                "error",
                new Error(`Category "${category}" does not exist.`)
            );
        }
        this.emit("subscribe", user, this.categories[formattedCategory]);
    }

    // Метод отписки от категории
    unsubscribe(user, category) {
        const formattedCategory = category.split(" ").join("");
        if (
            !user ||
            !this.categories[formattedCategory] ||
            !this.categories[formattedCategory].includes(user)
        ) {
            return this.emit(
                "error",
                new Error(`User "${user}" is not found in "${category}".`)
            );
        }
        this.emit("unsubscribe", user, formattedCategory);
    }

    // Метод публикации новости в категории
    publication(category) {
        const formattedCategory = category.split(" ").join("");
        if (!this.categories[formattedCategory]) {
            return this.emit(
                "error",
                new Error(`Category "${category}" does not exist.`)
            );
        }
        this.emit(
            "newsPublished",
            this.categories[formattedCategory],
            category
        );
    }
}

// Пример использования класса
const myNews = new NewsSubscription();

myNews.subscribe("Jonny", "sport Category");
myNews.subscribe("Jake", "food Category");

myNews.publication("sport Category");

console.log(myNews.categories.sportCategory);

myNews.unsubscribe("Jonny", "sport Category");

console.log(myNews.categories.sportCategory);
console.log(myNews.categories.foodCategory);
