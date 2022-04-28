// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./config/database");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require ('./middleware/errors');

app.use(express.json());
app.use(cookieParser());

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js

// Import all routes
const products = require("./routes/products.routes");
const auth = require("./routes/auth.routes")
const allRoutes = require("./routes/index.routes");

app.use("/api", allRoutes);
app.use("/api", products);
app.use("/api", auth);

app.use(errorMiddleware);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


module.exports = app;
