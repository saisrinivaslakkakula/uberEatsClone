const express = require('express')
const router = express.Router()
const {cassandraCreate,cassandraRead} = require('../controllers/cassandraControllers')
router.post('/create',cassandraCreate)
router.get('/read',cassandraRead)
//router.route('/update').put(casaandraUpdate)
//router.route('/delete').delete(cassandraDelete)
module.exports = router