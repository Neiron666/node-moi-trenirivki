const express = require("express");
const {
    getReviewsHandler,
    getSingleReviewHandler,
    postReviewHandler,
    putReviewHandler,
    deleteReviewHandler,
} = require("../controllers/reviews-controllers");

const router = express.Router();

router.get("/", getReviewsHandler);
router.get("/:reviewId", getSingleReviewHandler);
router.post("/", postReviewHandler);
router.put("/:reviewId", putReviewHandler);
router.delete("/:reviewId", deleteReviewHandler);

module.exports = router;
