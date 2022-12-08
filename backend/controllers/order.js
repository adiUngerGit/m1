// Order CONTROLLER
const {StatusCodes} = require('http-status-codes');
let {Order, OrderProduct} = require('../models/order');
const Product = require('../models/product');

const orderUpdate = async (req, res) => {
    let result;
    if (!req.body.productName) {
        res.status(StatusCodes.BAD_REQUEST).send('Please provide values');
    }

    let product_scheme = await Product.findOne({name: req.body.productName});
    if (!product_scheme) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`No product was found by the name ${req.body.productName}`);
    }
    OrderProduct = new OrderProduct({
        product: product_scheme._id,
        amount: 1,
    });
    let isOrderExist = await Order.find()
    if (!isOrderExist) {
        newOrder = new Order({
            user: req.user._id,
            products: [orderedProduct]
        });
        result = await newOrder.save();
        if (!result) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to save new product");
        }
    } else {
        const productInOrder = await Order.findOne({products: {$elemMatch: {product: product_scheme._id}}});
        const productAmount = productInOrder.amount
        update = {$set: {"products.$.amount": productAmount}};
        result = await Order.updateOne({
            products: {$elemMatch: {product: product_scheme._id}}
        }, update);
        if (!result) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to update amount");
        }
    }
return res.status(StatusCodes.CREATED).json({result});
}

const orderDelete = async (req, res) => {
    result = await Order.findOneAndDelete({user: user});//user declaration has removed
    if (!result) {
        throw new BaseError.NotFoundError(`Failed to delete order`);
    }

    res.status(StatusCodes.OK).json({result});
};

const orderList = async (req, res) => {
    let result = await Order.aggregate(
        [
            {"$match": {user: req.user._id}},
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
        throw new BaseError.InternalError(`Failed to list orders`);
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

    res.status(StatusCodes.OK).json({result});
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
    orderDelete,
    orderList,
};