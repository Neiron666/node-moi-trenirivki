const express = require("express");
const contactsRouter = require("./contacts");
const rootRouter = require("./root");

const router = express.Router();

router.use("/contacts", contactsRouter);
router.use("/", rootRouter);

module.exports = router;
