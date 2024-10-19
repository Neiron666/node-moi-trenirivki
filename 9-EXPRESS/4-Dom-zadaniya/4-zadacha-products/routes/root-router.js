const express = require("express");
const { getRootHandler } = require("../controllers/root-controller");

const router = express.Router();

router.get("/", getRootHandler);

module.exports = router;
