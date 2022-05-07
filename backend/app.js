// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();
console.log(process.env)

// ℹ️ Connects to the database
require("./config/database");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const cloudinary = require ('cloudinary')
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const path = require('path')

cloudinary.config ({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

const errorMiddleware = require('./middlewares/errors')
// Import all routes
// const products = require("./routes/product");
// const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

// app.use('/api', products);
app.use('/auth', auth)
app.use('/payment', payment)
app.use('/order', order)

const productRoutes = require("./routes/product");
app.use("/api", productRoutes);
const authRoutes = require ("./routes/auth");
app.use("/api", authRoutes);


// const allRoutes = require("./routes/order");
// app.use("/api", allRoutes);
// const projectRoutes = require("./routes/payment");
// app.use("/api", projectRoutes);

// const authRoutes = require ("./routes/auth");
// app.use("/api", authRoutes);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;



