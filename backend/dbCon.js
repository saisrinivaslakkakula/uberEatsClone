const mongoose =  require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const db = async () =>{
    try { 
        // mongoose connect always returns a promise// hence await is required
        const con = await mongoose.connect('mongodb+srv://sai_1234:Lenovo0121@cluster0.poq5b.mongodb.net/ubereats?retryWrites=true&w=majority',
            {useUnifiedTopology:true,useNewUrlParser:true}
            )
       console.log(`Connected to DB ${con.connection.host}`) 
    } catch (error) {
        console.log(`Connection Failed! ${error}`) 
        process.exit(1)
    }
}

module.exports = db;