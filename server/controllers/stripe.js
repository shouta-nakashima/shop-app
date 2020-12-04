const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/coupon')
const stripe = require('stripe')(process.env.STRIPE_SECRET)


exports.createPaymentIntent = async (req, res) => {
  //console.log(req.body);
  const {couponApplied} = req.body
  //1 find user
  const user = await User.findOne({email: req.user.email}).exec()
  //2 get user cart total
  const {cartTotal, totalAfterDiscount} = await Cart.findOne({orderdBy: user._id}).exec()

  //console.log('CART TOTAL  ===>', cartTotal, 'AFTER DISCOUNT =====>', totalAfterDiscount);
  let finalAmount = 0

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount
  } else {
    finalAmount = cartTotal
  }
  //注文金額と通貨で支払いインテントを作成
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd"
  })
  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount
  })
}