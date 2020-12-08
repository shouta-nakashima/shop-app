const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: ObjectId,
        ref: "Product"
      },
      count: Number,
      color: String,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: '手続き内容の確認中',
    enum: [
      "手続き内容の確認中",
      "配送準備中",
      "配送中",
      "キャンセルされました",
      "お取引完了"
    ]
  },
  orderdBy: {type: ObjectId, ref: "User"}
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)