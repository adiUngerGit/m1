const express = require('express');

const router = express.Router();
const {
    orderUpdate,
    orderDelete,
    orderList,
} = require('../controllers/order');

router.route('/update').post(orderUpdate);
router.route('/delete').post(orderDelete);
router.route('/list').get(orderList);

module.exports = router;
