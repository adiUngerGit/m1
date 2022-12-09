// Order CONTROLLER
const {StatusCodes} = require('http-status-codes');
let {Order, OrderProduct} = require('../models/order');
const Product = require('../models/product');

const orderUpdate = async (req, res) => {
    let result;
    if (!req.body.productName) {
        return res.status(StatusCodes.BAD_REQUEST).send('Please provide values');
    }

    let product_scheme = await Product.findOne({name: req.body.productName});
    if (!product_scheme) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`No product was found by the name ${req.body.productName}`);
    }

    let isOrderExist = await Order.find()
    //order does not exist
    let isProductExist;
    let newOrder;
    if (isOrderExist.length === 0) {
        newOrder = new Order({
            products: [orderProduct(product_scheme)]
        });
        result = await newOrder.save();
        if (!result) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to save new product");
        }
    } else {
        //order exist and product already exist in products' order list
        isProductExist = await Order.findOne({products: {$elemMatch: {product: product_scheme._id}}})
        if (isProductExist) {
            update = {$inc: {"products.$.amount": 1}};
            result = await Order.updateOne({
                products: {$elemMatch: {product: product_scheme._id}}
            }, update);
            if (!result) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to update amount");
            }
        } else {
            //Order exists, but product is not yet listed in order's product list
            result = await Order.update({},
                {$push: {products: orderProduct(product_scheme)}});
            if (!result) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to save new product");
            }
        }
    }
    return res.status(StatusCodes.CREATED).json({result});
}

function orderProduct(product_scheme) {
   return orderProduct = new OrderProduct({
        product: product_scheme._id,
        amount: 1,
    });
}

const orderDelete = async (req, res) => {
    result = await Order.findOneAndDelete({});
    if (!result) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Failed to delete order`);
    }

    res.status(StatusCodes.OK).json({ result });
};

const orderList = async (req, res) => {
    let result = await Order.aggregate(
        [
            {"$unwind": "$products"},
            {
                "$group": {
                    "_id": {
                        "product": "$products.product"
                    },
                    "amount": {$sum: "$products.amount"}
                }
            },
            {
                "$group": {
                    "_id": "$_id.product",
                    "products": {
                        "$push": {
                            "product": "$_id.product",
                            "amount": "$amount"
                        }
                    }
                }
            }
        ]);

    if (!result) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Failed to list orders`);
    }

    var products = [];
console.log(result);
    if (result.length > 0) {
        for(let i=0; i<result.length; i++){
        for (product of result[i].products) {
            populated_product = await Product.populate(product, {path: "product"});
            if (!populated_product) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Failed to populate product: ${populated_product}`)
            }

            products.push(populated_product);
        }}
    }

    return res.status(StatusCodes.OK).json({result});
}

module.exports = {
    orderUpdate,
    orderDelete,
    orderList,
};