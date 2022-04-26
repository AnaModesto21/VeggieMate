const express = require('express')
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct

} = require('../controllers/productController');

// router.route('/products').get(getProducts);
// router.route('/product/:id').get(getSingleProduct);

router.get("/", (req, res) => getProducts(req,res));

router.get("/:id", (req, res) => getSingleProduct(req,res));

router.post("/new", (req, res) => newProduct(req,res));

router.put("/:id", (req, res) => updateProduct(req,res));

router.delete("/:id", (req, res) => deleteProduct(req,res));

module.exports = router;
