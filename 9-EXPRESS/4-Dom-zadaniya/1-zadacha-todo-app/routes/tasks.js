const express = require("express");

const router = express.Router();

const {
    deleteSingleTaskHandler,
    getSingleTaskHandler,
    getTasksHandler,
    postSingleTaskHandler,
    putSingleTaskHandler,
} = require("../controllers/tasks");

router.get("/", getTasksHandler);
router.get("/:taskId", getSingleTaskHandler);
router.post("/", postSingleTaskHandler);
router.put("/:taskId", putSingleTaskHandler);
router.delete("/:taskId", deleteSingleTaskHandler);

module.exports = router;
