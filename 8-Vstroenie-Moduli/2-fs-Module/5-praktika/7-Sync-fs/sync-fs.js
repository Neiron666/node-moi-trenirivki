const fs = require("fs");

try {
    fs.writeFileSync("./first.txt", "First file text");
    console.log("File first.txt was written");
    fs.appendFileSync("./first.txt", "\nOne more line");
    console.log("Appended text to the first.txt file");
    fs.renameSync("first.txt", "./renamed-first.txt");
    console.log("file was renamed");
} catch (error) {
    console.log(error);
}
