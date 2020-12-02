const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs')
//const fs = require('fs') 上記に変更
require('dotenv').config()

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERROR', err))

//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors())

//route middleware

//fs.readdirSyncを下記に変更
readdirSync('./routes').map((r) =>
  app.use('/api', require('./routes/' + r))
)

//port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`server running on port ${port}`))