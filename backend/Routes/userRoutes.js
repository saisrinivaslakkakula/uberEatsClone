const express = require('express')
const createUser;
const router = express.Router()

router.route('/adduser').post(createUser)