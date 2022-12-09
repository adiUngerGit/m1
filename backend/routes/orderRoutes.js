const express = require('express');

const router = express.Router();
const {
    orderUpdate,
    orderDeleteProduct,
    orderList,
} = require('../controllers/order');

router.route('/update').post(orderUpdate);
router.route('/delete').post(orderDeleteProduct);
router.route('/list').get(orderList);

module.exports = router;
