//************************** HTTP *************************************** */

// const http = require("http");
// const server = http.createServer((req, res) => {
//     res.end("Response from the server");
// });

// server.listen(5000, () => {
//     console.log("Server was launched on port 5000");
// });
// server.listen(5000, () => {
//     console.log("Server was launched on port 5000");
// });

// ************************ EXPRESS ****************************************

const express = require("express");

const app = express();
console.log(app);

app.get("/", (req, res) => res.send("Response from EXPRESS"));

app.listen(5000, () => {
    console.log("Server was launched on port 5000");
});
