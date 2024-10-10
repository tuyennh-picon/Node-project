const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();

// init middleware
app.use(morgan("dev"))
app.use(helmet());
app.use(compression())

require('./dbs/init.mongo')
const { checkOverloadedConnections } = require('./helpers/check-connect')
checkOverloadedConnections()

app.use('/', require('./routes/index'));


module.exports = app