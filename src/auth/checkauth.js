'use strict'

const { findById } = require("../services/apikey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const  apiKey = async (req, res, next) =>{
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        // console.log(req.headers)
        if (!key) {
            return res.status(403).json({
                message: "Forbiden ERROR"
            })
        }

        const objKey = await findById(key);
        if (!objKey) {
            return res.status(403).json({
                message: "Forbiden ERROR"
            })
        }

    req.objKey = objKey;
    return next();

    } catch (error) {
        console.log(error)
    }
}

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    apiKey,
    asyncHandler
}