const express = require('express')
const router = express.Router()
const {addOrder} = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')
router.route('/add').post(protect,addOrder)
module.exports = router