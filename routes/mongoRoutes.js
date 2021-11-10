const express = require('express')
const router = express.Router()
const readUser = require('../controllers/mongoControllers')
router.get('/read',readUser) 
module.exports = router 