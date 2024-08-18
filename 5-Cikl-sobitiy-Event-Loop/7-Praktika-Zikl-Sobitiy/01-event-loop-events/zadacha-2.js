// Задача 2: Использование Promise и таймеров
// Описание задачи:

// Выведите в консоль Start.
// Создайте промис, который сразу же выполняется и в его коллбэке выведите Promise.
// Установите таймер с задержкой 20 мс, который выводит Timer 20ms.
// Установите таймер с задержкой 5 мс, который выводит Timer 5ms.
// Выведите в консоль End после установки таймеров и промиса.

console.log("Start");
Promise.resolve().then(() => console.log("Promise"));
setTimeout(() => console.log("Timer 5ms"), 5);
setTimeout(() => console.log("Timer 20ms"), 20);
setTimeout(() => console.log("End"), 30);
