const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json()) 
const mysql = require('mysql')
const db = mysql.createConnection({
host     : 'ubereatsdb.ccz6fxp12byz.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'mydatabase',
  database:'ubereats'
})

db.connect((err)=>{
    if(err){
        console.error(err.stack)
        return
    }
    console.log("Connected To DB "+db.threadId)
})
app.get('/allusers',(req,res)=>{
    let sql = 'SELECT * FROM users'
    db.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result)
        res.send(result)

    })
}) 

app.post('/api/adduser',async(req,res)=>{
    const{firstName,lastName,email,phone,password} = req.body
    let sql = "INSERT INTO `users` (`firstName`, `lastName`, `email`, `password`, `phone`) VALUES ('"+firstName+"', '"+lastName+"','"+email+"','"+password+"',"+phone+" ) "
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
app.get('/',(req,res)=>{
    res.send("API Running...")
})

app.listen(5000,console.log("Server Started on port 5000"))