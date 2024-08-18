const fs = require("fs");

console.log("program start");
setTimeout(() => console.log("Timer 10ms"), 10);
setTimeout(() => console.log("Timer 20ms"), 20);
setTimeout(() => console.log("program END"), 30);

fs.writeFile("./test2.txt", "Hello NodeJs", () => console.log("file written"));

Promise.resolve().then(() => console.log("Promise"));
