const express = require("express");
const {
    getProductsHandler,
    getSingleProductHandler,
    postSingleProductHandler,
    putProductHandler,
    deleteProductHandler,
} = require("../controllers/products-controllers");

const router = express.Router();

router.get("/", getProductsHandler);
router.get("/:productId", getSingleProductHandler);
router.post("/", postSingleProductHandler);
router.put("/:productId", putProductHandler);
router.delete("/:productId", deleteProductHandler);

module.exports = router;
