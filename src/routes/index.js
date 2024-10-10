
const express = require('express');

const router = express.Router();

// router.get('/test', (req, res, next) => {
//     return res.status(200).json({
//         "message": "hello world"
//     });
// });

router.use('/api/v1', require('./auth'))
module.exports = router