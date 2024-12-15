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
const passport = require('passport')

dotenv.config()
db()
//passport middleware

app.use(passport.initialize())
//passport config
require('./config/passport')(passport)


if(process.env.ENV === 'production'){
    //console.log(__dirname+"/frontend/build")
    console.log("sqweq")
    app.use(express.static(path.resolve(__dirname,'../','frontend','build')))
    app.get('*',(req,res)=>{
        console.log("sdasd")
        res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))
    })
}
else{
    console.log("sdasds")
    app.get('/',(req,res)=>{
       
        res.send("API Running...")
    })
}
//
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/restaurant',restaurantRoutes)
app.use('/api/order',orderRoutes)
app.use('/uploads',express.static(path.join(__dirname,'../','/uploads')))
app.use(notFound)
app.use(errorHandler)





app.listen(5001,console.log("Server Started on port 5001"))