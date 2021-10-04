const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {addRestaurant,updateRestaurant,getRestaurantProfile,
    getAllRestaurants,getRestaurantProfileforAdmin,
    addmenuItem,getMenuByRestaurant,getItemDetails} = require('../controllers/restaurantController')
router.route('/add').post(protect,addRestaurant)
router.route('/update').put(protect,updateRestaurant)
router.route('/additem').post(protect,addmenuItem)
router.post('/profile',getRestaurantProfile)
router.post('/profileadm',getRestaurantProfileforAdmin)
router.get('/:id',getMenuByRestaurant)
router.get('/menuItem/:id',getItemDetails)
router.get('/',getAllRestaurants)
module.exports = router
