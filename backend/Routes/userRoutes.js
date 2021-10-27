const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const passport = require('passport')
const {addUser,authUser,getUserProfile,updateUserProfile,addFavourite,getUserFavourites,removeFavourites} = require('../controllers/userController')
router.post('/adduser',addUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/addfavourite/:cust_id/:rest_id').get(protect,addFavourite)
router.route('/getFauvourites/:cust_id/').get(protect,getUserFavourites)
router.route('/removeFavourites/:rest_id/').delete(protect,removeFavourites)
module.exports = router