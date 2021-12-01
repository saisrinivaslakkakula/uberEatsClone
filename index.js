
const express = require('express')
const app = express()
app.use(express.json())
const client = require('./dbconfig')
const connectDB = require('./mongodbconfig')
connectDB()
const query = "SELECT * FROM \"sample\".\"test\";"
const cassandraRoutes = require('./routes/cassandraRoutes')
const mongoRoutes = require('./routes/mongoRoutes')
app.get("/",(req,res)=>{
                res.send("API Running...")
})        
app.use("/api/cassandra",cassandraRoutes)
app.use("/api/mongo",mongoRoutes)

app.listen(5001,console.log("Server started on prt 5001"))



















