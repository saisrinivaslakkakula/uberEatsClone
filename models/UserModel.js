const mongoose = require('mongoose') 

const userSchema = mongoose.Schema({
        name:{
            type:String,
            required:true
            
        },
        
        
    },{timestamps:true})

    userSchema.methods.matchPassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }

    const User = mongoose.model('User',userSchema) 
    module.exports = User
