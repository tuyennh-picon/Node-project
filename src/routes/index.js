
const express = require('express');
const { apiKey } = require('../auth/checkauth');

const router = express.Router();

// router.get('/test', (req, res, next) => {
//     return res.status(200).json({
//         "message": "hello world"
//     });
// });

router.use(apiKey)
router.use('/api/v1', require('./auth'))
module.exports = router