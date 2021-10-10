const mysql = require('mysql')
const env = require('dotenv')
env.config()
const db = mysql.createConnection({
    host     : process.env.DB_URI,
    port:3306,
      user     : 'admin',
      password : 'mydatabase',
      database:'ubereats',
      
    })
    module.exports = db