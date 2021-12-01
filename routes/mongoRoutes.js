const express = require('express')
const router = express.Router()
const {readUser,createUser, updateUser, deleteUser} = require('../controllers/mongoControllers')

router.get('/read',readUser)
router.post('/create',createUser)
router.put('/update', updateUser)
router.delete('/delete/:id', deleteUser)
module.exports = router 