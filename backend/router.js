const express = require('express');
const ProductRouter = require('./routes/productRoutes');


const AppRouter = express.Router();

AppRouter.use('/products', ProductRouter);

module.exports = AppRouter;