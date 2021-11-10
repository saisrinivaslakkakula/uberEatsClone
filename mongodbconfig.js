const mongoose =  require('mongoose')
const env = require('dotenv')
const connectDB = async () =>{
    try { 
        // mongoose connect always returns a promise// hence await is required
        const con = await mongoose.connect('mongodb+srv://sai_1234:Lenovo0121@cluster0.poq5b.mongodb.net/Test?authSource=admin&replicaSet=atlas-r0h13q-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
            {useUnifiedTopology:true,useNewUrlParser:true}
            )
       console.log(`Connected to DB ${con.connection.host}`) 
    } catch (error) {
        console.log(`Connection Failed! ${error}`) 
        process.exit(1)
    }
}

module.exports = connectDB;