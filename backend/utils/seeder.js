const Product = require('../models/product');

const products = require('../data/products');

const seedProducts = async () => {
    try {

        await Product.insertMany(products)
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()