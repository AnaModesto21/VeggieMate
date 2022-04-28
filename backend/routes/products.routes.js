const express = require('express')
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    // getAdminProducts,
    deleteProduct

} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require ('../middleware/auth')

router.get("/products", (req, res) => (isAuthenticatedUser, authorizeRoles('admin'), getProducts)(req,res));

// router.get("/admin/products", (req, res) => getAdminProducts(req,res));

router.get("/products/:id", (req, res) => getSingleProduct(req,res));

router.post("/admin/products/new", (req, res) => newProduct(req,res));

router.put("/products/:id", (req, res) => updateProduct(req,res));

router.delete("/products/:id", (req, res) => deleteProduct(req,res));

module.exports = router;
