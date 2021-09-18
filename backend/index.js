const express = require('express')
const path = require('path')
const app = express()
app.use(express.json()) 
const mysql = require('mysql')
const dotenv = require('dotenv')
const db = require('./dbCon')
const userRoutes = require('./Routes/userRoutes')
const uploadRoutes = require('./Routes/uploadRoutes')
const {notFound,errorHandler} = require('./middleware/errorHandlerMiddleware')

dotenv.config()
db.connect((err)=>{
    if(err){
        console.error(err.stack)
        return
    }
    console.log("Connected To DB "+db.threadId)
})
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)

app.use('/uploads',express.static(path.join(__dirname,'../','/uploads')))

app.use(notFound)
app.use(errorHandler)



/*app.get('/allusers',(req,res)=>{
    let sql = 'SELECT * FROM users'
    db.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result)
        res.send(result)

    })
}) */


app.get('/',(req,res)=>{
    res.send("API Running...")
})

app.listen(5000,console.log("Server Started on port 5000"))