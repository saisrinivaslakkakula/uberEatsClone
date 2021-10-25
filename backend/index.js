const express = require('express')
const path = require('path')
const app = express()
app.use(express.json()) 
const mysql = require('mysql')
const dotenv = require('dotenv')
const db = require('./dbCon')
const userRoutes = require('./Routes/userRoutes')
const uploadRoutes = require('./Routes/uploadRoutes')
const adminRoutes = require('./Routes/adminRoutes')
const restaurantRoutes = require('./Routes/restaurantRoutes')
const orderRoutes = require('./Routes/orderRoutes')
const {notFound,errorHandler} = require('./middleware/errorHandlerMiddleware')

dotenv.config()
db()
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/restaurant',restaurantRoutes)
app.use('/api/order',orderRoutes)
app.use('/uploads',express.static(path.join(__dirname,'../','/uploads')))

app.use(notFound)
app.use(errorHandler)



app.get('/',(req,res)=>{
    res.send("API Running...")
})

app.listen(5000,console.log("Server Started on port 5000"))