const express = require("express");

const router = express.Router();

const commentsRouter = require("./comments");
const usersRouter = require("./users");
const rootRouter = require("./root");

// Когда маршрутизатор зарегистрирован через app.use("/comments", commentsRouter), это означает, что все маршруты внутри commentsRouter будут относиться к пути /comments
// Например: GET /comments/ вызовет getCommentsHandler. POST /comments/ вызовет postCommentsHandler.
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);
router.use("/", rootRouter);

module.exports = router;
