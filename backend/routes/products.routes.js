const express = require('express')
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProduct

} = require('../controllers/productController');

// router.route('/products').get(getProducts);
// router.route('/product/:id').get(getSingleProduct);

router.get("/", (req, res) => getProducts(req,res));

router.get("/:id", (req, res) => getSingleProduct(req,res));

module.exports = router;