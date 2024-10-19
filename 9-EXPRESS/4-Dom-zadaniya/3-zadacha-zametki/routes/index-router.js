const express = require("express");

const notesRouter = require("./notes-router");
const rootRouter = require("./root-router");

const router = express.Router();

router.use("/notes", notesRouter);

router.use("/", rootRouter);

module.exports = router;
