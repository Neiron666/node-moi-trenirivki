const express = require("express");

const router = express.Router();

const {
    deleteSingleContactHandler,
    getContactSingleHandler,
    getContactsHandler,
    postSingleContactHandler,
    putSingleContactHandler,
} = require("../controllers/contacts");

router.get("/", getContactsHandler);
router.get("/:contactId", getContactSingleHandler);
router.post("/", postSingleContactHandler);
router.put("/:contactId", putSingleContactHandler);
router.delete("/:contactId", deleteSingleContactHandler);

module.exports = router;
