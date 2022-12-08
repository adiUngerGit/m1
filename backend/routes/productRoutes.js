const express = require('express');
const router = express.Router();
const {
    productCreate,
    productUpdate,
    productDelete,
    productList,
} = require('../controllers/product');

router.route('/create').post(productCreate);
router.route('/update').post(productUpdate);
router.route('/delete').post(productDelete);
router.route('/list').get(productList);

module.exports = router;