const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");

const app = express();

// init middleware
app.use(morgan("dev"))
app.use(helmet());
app.use(compression())
app.use(express.json());

require('./dbs/init.mongo-v2')
// const { checkOverloadedConnections } = require('./helpers/check-connect')
// checkOverloadedConnections()

app.use('/', require('./routes/index'));
app.use((req, res, next) => {
    const  error = new Error("404 ");
    error.status = 404;
    next(error)
})


app.use((error,req, res, next) => {
    const status = error.status || 500;
   return res.status(status).json({
        status: 'error',
        code: status,
        message: error.message || 'Internal Error'
   });
})


module.exports = app