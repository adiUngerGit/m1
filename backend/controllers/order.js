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
    orderProduct = new OrderProduct({
        product: product_scheme._id,
        amount: 1,
    });
    let isOrderExist = await Order.find()
    if (isOrderExist.length==0) {
        newOrder = new Order({
            products: [orderProduct]
        });
        result = await newOrder.save();
        if (!result) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to save new product");
        }
    } else {
        isProductExist= await Order.findOne({products: {$elemMatch: {product: product_scheme._id}}})
        if(!sProductExist){
            update = {$inc: {"products.$.amount": 1}};
            result = await Order.updateOne({
                products: {$elemMatch: {product: product_scheme._id}}
            }, update);
            if (result) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to update amount");
            }}else{
            ///  case for order exist but product isnt exist in order
        }
    }
    return res.status(StatusCodes.CREATED).json({result});
}

const orderDeleteProduct = async (req, res) => {
    result = await Order.findOneAndDelete({
        products: {$elemMatch: {product: product_scheme._id}}
    });
    if (!result) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Failed to delete order`);
    }

    return res.status(StatusCodes.OK).json({result});
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

    if (result.length > 0) {
        for (product of result[0].products) {
            populated_product = await Product.populate(product, {path: "product"});
            if (!populated_product) {
                throw new BaseError.InternalError(`Failed to populate product: ${populated_product}`)
            }

            products.push(populated_product);
        }
    }

    return res.status(StatusCodes.OK).json({result});
}

const sortUsersByExpenses = async (req, res) => {
    let result = await Order.aggregate(
        [
            {"$unwind": "$products"},
            {
                "$group": {
                    "_id": {
                        "user": "$user",
                        "product": "$products.product"
                    },
                    "amount": {$sum: "$products.amount"}
                }
            },
            {
                "$group": {
                    "_id": "$_id.user",
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
        throw new BaseError.InternalError("Failed to list orders");
    }

    var user_expenses = {};

    users = await User.populate(result, {path: "_id"});
    if (!users) {
        throw new BaseError.InternalError(`Failed to populate users: ${users}`)
    }

    for (user of users) {
        var total_expense = 0;
        for (product of user.products) {
            populated_product = await Product.populate(product, {path: "product"});
            if (!populated_product) {
                throw new BaseError.InternalError(`Failed to populate product: ${product}`)
            }

            total_expense += populated_product.product.price * populated_product.amount;
        }

        user_expenses[user._id.username] = total_expense;
    }

    var items = sort_dictionary(user_expenses);

    res.status(StatusCodes.OK).json({items});
}

const sortProductsBySells = async (req, res) => {
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
            }
        ]);

    if (!result) {
        throw new BaseError.InternalError("Failed to list orders");
    }

    products = await Product.populate(result, {path: "_id.product"});
    if (!products) {
        throw new BaseError.InternalError(`Failed to populate users: ${users}`)
    }

    var product_sells = {};

    for (product of products) {
        product_sells[product._id.product.name] = product._id.product.price * product.amount;
    }

    var items = sort_dictionary(product_sells);

    res.status(StatusCodes.OK).json({items});
}

function sort_dictionary(dictionary) {
    // Sort the dictionary
    // Create the array of key-value pairs
    var items = Object.keys(dictionary).map(
        (key) => {
            return [key, dictionary[key]]
        });

    // Sort the array based on the second element (i.e. the value)
    items.sort(
        (first, second) => {
            return first[1] - second[1]
        }
    );

    return items;
}

module.exports = {
    orderUpdate,
    orderDeleteProduct,
    orderList,
};