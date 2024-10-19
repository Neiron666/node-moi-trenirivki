const express = require("express");
const { getRootHandler } = require("../controllers/root-review-controller");

const router = express.Router();

router.get("/", getRootHandler);

module.exports = router;
