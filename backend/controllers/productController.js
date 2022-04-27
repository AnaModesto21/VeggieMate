const ProductModel = require('../models/product')
const Product = require('../models/product')
// const User = require("../models/user");
const jwt = require("jsonwebtoken");
const APIFeatures = require ('../utils/APIFeatures')



    exports.newProduct = async (req, res, next) => {

        const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

    exports.getProducts =  async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();
    
    const apiFeatures = new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products        })
}

    exports.getSingleProduct = async (req, res, next) => {

        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success:true
       })

    exports.updateProduct = async (req, res, next ) => {
        let product = await Product.findById(req.params.id);
        
        if(!product) {
                        return res.status(404).json({
                        success: false,
                        message: 'product not found'
        })
        }
                        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidator:true
        });
        
        res.send(200).json({
                        success: true,
                        product
        })
        }

        
        exports.deleteProduct = async (req, res, next) => {
            let product = await Product.findById(req.params.id);

            if(!product) {
                    return res.status(404).json({
                    success: false,
                    message: 'product not found'
        })
    }
            await product.findByIdAndDelete()

                res.send(200).json({
                success: true,
                message: 'Product is deleted'
        })
    }
}