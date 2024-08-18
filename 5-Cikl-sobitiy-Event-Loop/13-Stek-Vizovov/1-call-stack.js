//в данном примере функции вызывают друг друга и пока не дошли до последней функции - сохраняются в стэке вызовов
//Пока хоть одна из функций находиться в стэке вызовов - нод js не обрабатывает следующее событие
//т.е. цикл событий ждет пока все функции завершат свою работу(в случае если функции синхронны)

function thirdFunction() {
    return 10;
}
function secondFunction() {
    return thirdFunction();
}
function firstFunction() {
    return secondFunction();
}

console.log(firstFunction());
