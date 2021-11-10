const express = require('express')
const router = express.Router()
const {readUser,createUser} = require('../controllers/mongoControllers')
router.get('/read',readUser) 
router.post('/create',createUser) 
module.exports = router 