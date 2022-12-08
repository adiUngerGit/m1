const express = require('express');
const ProductRouter = require('./routes/productRoutes');
const OrderRouter = require('./routes/orderRoutes');


const AppRouter = express.Router();

AppRouter.use('/products', ProductRouter);
AppRouter.use('/orders', OrderRouter);

module.exports = AppRouter;