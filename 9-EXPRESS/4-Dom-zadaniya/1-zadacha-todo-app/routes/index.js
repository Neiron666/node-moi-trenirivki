const express = require("express");

const router = express.Router();

const tasksRouter = require("./tasks");
const rootRouter = require("./root");

router.use("/tasks", tasksRouter);
router.use("/", rootRouter);

module.exports = router;
