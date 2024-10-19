const express = require("express");

const router = express.Router();

const rootRouter = require("./root-review-router");
const reviewsRouter = require("./reviews-routes");

router.use("/", rootRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
