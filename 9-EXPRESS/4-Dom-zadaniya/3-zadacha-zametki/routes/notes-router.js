const express = require("express");
const {
    getNotesHandler,
    getSingleNoteHandler,
    postSingleNoteHandler,
    putSingleNoteHandler,
    deleteSingleNoteHandler,
} = require("../controllers/notes-controllers");

const router = express.Router();

router.get("/", getNotesHandler);
router.get("/:noteId", getSingleNoteHandler);
router.post("/", postSingleNoteHandler);
router.put("/:noteId", putSingleNoteHandler);
router.delete("/:noteId", deleteSingleNoteHandler);

module.exports = router;
