const { json } = require("body-parser");
const express = require("express");
const router = express.Router();

const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview

} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } 
= require('../middlewares/auth');

// router.get("/", (req, res) => {
//     res.status(200).json({ message: "lalalalal "})
// });
router.get("/", (req, res) => getProducts(req,res));
router.get("/products/:id", (req, res) => getSingleProduct(req,res));

router.put('/review', isAuthenticatedUser , (req, res) => createProductReview(req,res));
router.put('/reviews', isAuthenticatedUser , (req, res) => getProductReviews(req,res));
router.put('/reviews', isAuthenticatedUser , (req, res) => deleteReview(req,res));

module.exports = router;
