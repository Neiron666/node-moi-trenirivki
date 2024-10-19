const express = require("express");

const rootRouter = require("./root-router");
const productsRouter = require("./products-router");

const router = express.Router();

router.use("/", rootRouter);
router.use("/products", productsRouter);

module.exports = router;
