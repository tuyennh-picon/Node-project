'use strict'

const mongoose = require("mongoose");
const {countConnections} = require('./helpers/check-connect')

mongodb://localhost:27017

mongoose.connect('mongodb://localhost:27017/shop_dev').then(() => {
    console.log('connect successfully')
})
.catch((err) =>  console.log(`Connect DB err: ${err}`))

mongoose.set('debug', true)

module.exports = mongoose