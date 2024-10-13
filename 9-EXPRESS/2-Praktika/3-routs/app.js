const express = require("express");
const router = require("./routes/index");

//создаем обьект app - когда вызоваем функцию express();
const app = express();

// Поскольку app.use(router); не имеет второго параметра (как базового пути), все маршруты внутри маршрутизатора будут относиться напрямую к корню
//маршруты, определённые в этом маршрутизаторе, начинаються с корневого пути "/"
app.use(router);

// //COMMENTS
// const getCommentsHandler = (req, res) => {
//     res.send("Get comments route");
// };
// const getSingleCommentHandler = (req, res) => {
//     res.send(`Get comment route. CommentId ${req.params.commentId}`);
// };
// const postCommentsHandler = (req, res) => {
//     res.send("Post comments route");
// };
// const deleteCommentHandler = (req, res) => {
//     res.send(`Delete comment route. CommentId ${req.params.commentId}`);
// };

//USERS
// const getUsersHandler = (req, res) => {
//     res.send("Get users route");
// };
// const getSingleUserHandler = (req, res) => {
//     res.send(`Get user route. UsertId ${req.params.userId}`);
// };
// const postUsersHandler = (req, res) => {
//     res.send("Post users route");
// };

// // //******************Если совпадают пути - можно использевать метод route**************************
// // app.route("/comments").get(getCommentsHandler).post(postCommentsHandler);
// app.get("/comments", getCommentsHandler);
// app.post("/comments", postCommentsHandler);

// //:commentId - в данном случае это вводимый нами параметр после слэша comments/ в URL строке
// //Двоеточие (:) перед commentId говорит о том, что это динамический параметр маршрута.
// app.get("/comments/:commentId", getSingleCommentHandler);
// app.delete("/comments/:commentId", deleteCommentHandler);

// app.get("/users", getUsersHandler);
// app.post("/users", postUsersHandler);
// app.get("/users/:userId", getSingleUserHandler);

app.listen(5000, () => {
    console.log("Server was launched on port 5000");
});
