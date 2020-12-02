const express = require('express')
const { auth } = require('../firebase')

const router = express.Router()

//middlewares
const {authCheck} = require('../middlewares/auth')

//controllers
const {userCart} = require('../controllers/user')

router.post('/cart',authCheck, userCart)

//route
// router.get('/user', (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint"
//   })
// })

module.exports = router