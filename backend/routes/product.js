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

router.get("/", (req, res) => getProducts(req,res));
router.get("/:id", (req, res) => getSingleProduct(req,res));

router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => getAdminProducts(req,res));
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => newProduct(req,res));
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => updateProduct(req,res));
router.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => deleteProduct(req,res));

router.put('/review', isAuthenticatedUser , (req, res) => createProductReview(req,res));
router.put('/reviews', isAuthenticatedUser , (req, res) => getProductReviews(req,res));
router.put('/reviews', isAuthenticatedUser , (req, res) => deleteReview(req,res));

module.exports = router;
