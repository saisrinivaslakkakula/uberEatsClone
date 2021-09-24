const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {addAdmin,authAdmin,getAdminProfile,updateAdminProfile} = require('../controllers/adminController')
router.post('/register',addAdmin)
router.post('/login',authAdmin)
router.route('/profile').get(protect,getAdminProfile).put(protect,updateAdminProfile)
module.exports = router
