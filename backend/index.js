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
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const { Schema } = require('./graphQL/schema')
const {root} = require('./graphQL/resolver')
dotenv.config()
db()
//passport middleware
var schema = buildSchema(Schema);
app.use(passport.initialize())
//passport config
require('./config/passport')(passport)

//

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));




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

app.listen(5001,console.log("Server Started on port 5001"))