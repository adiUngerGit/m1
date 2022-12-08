// Product CONTROLLER
const {StatusCodes} = require('http-status-codes');
const Product = require('../models/product');

const productCreate = async (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.img) {
        res.status(StatusCodes.BAD_REQUEST).send('Please provide values');
    }

    let newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
    });

    result = await newProduct.save();
    if (!result) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to save new product");
    }
    return res.status(StatusCodes.CREATED).json({result});
}

const productUpdate = async (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.img) {
        res.status(StatusCodes.BAD_REQUEST).send('Please provide values');
    }
    productFound = await Product.findOne({name: req.body.name})
    if (!productFound) {
        res.status(StatusCodes.BAD_REQUEST).send('Product not found');
    }
    // using callback
    result = await Product.findOneAndUpdate({name: req.body.name}, {
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
    });
    if (!result) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Failed to update product : ${req.body.name}`);
    }

    res.status(StatusCodes.OK).json({result});
}

const productDelete = async (req, res) => {
    result = await Product.findOneAndDelete({name: req.body.name});
    if (!result) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Failed to delete product: ${req.body.name}`);
    }

    res.status(StatusCodes.OK).json({result});
};

const productList = async (req, res) => {
    let result = await Product.find();
    if (!result) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to list products");
    }

    res.status(StatusCodes.OK).json({result});
};


module.exports = {
    productCreate,
    productUpdate,
    productDelete,
    productList,
};