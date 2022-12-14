const mongoose = require("mongoose");

const OrderProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  amount: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema(
  {
    products: [OrderProductSchema],
  },
  { autoCreate: true }
);

const myDB = mongoose.connection.useDb("orders");

const OrderProduct = mongoose.model("orderedProduct", OrderProductSchema);

const Order = mongoose.model("order", orderSchema);

module.exports = { Order, OrderProduct };
