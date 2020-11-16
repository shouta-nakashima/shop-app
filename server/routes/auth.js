const express = require('express')

const router = express.Router()

//middlewares
const {authCheck} = require('../middlewares/auth')

//controller 
const { createOrUpdateUser } = require('../controllers/auth')

//testing
// const myMiddleware = (req, res, next) => {
//   console.log('My Middle Ware');
//   next()
// }

//route
router.post('/create-or-update-user', authCheck, createOrUpdateUser)

//testing
// router.get('/testing', myMiddleware, (req, res) => {
//   res.json({
//     data: 'You Successfully tried middleware'
//   })
// })

module.exports = router