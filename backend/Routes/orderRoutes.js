const express = require('express')
const router = express.Router()
const {addOrder,getordersByCustomerID,getordersByRestaurantID,getordersByOrderID,getOrderDetailsForCustomer, adminChangeOrderByID} = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')
router.route('/add').post(protect,addOrder)
router.route('/getOrderByCustomer/:id').get(protect,getordersByCustomerID)
router.route('/getOrderByRestaurant/:id').get(protect,getordersByRestaurantID)
router.route('/getOrderDetailsByOrderID/:id').get(protect,getordersByOrderID)
router.route('/getCustomerOrders/:id').get(protect,getOrderDetailsForCustomer)
router.route('/changeOrderStatus/:id/:status').put(adminChangeOrderByID)
module.exports = router