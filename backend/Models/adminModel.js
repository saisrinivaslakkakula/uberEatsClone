const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')

const adminSchema = mongoose.Schema({
        firstName:{
            type:String,
            reqired:true
            
        },
        lastName:{
            type:String,
            reqired:true
            
        },
        email:{
            type:String,
            unique:true,
            reqired:true
        },
        password:{
            type:String,
            reqired:true
        },
        phone:{
            type:String,
            reqired:true
        },
        
        photo_path:{
            type:String
        }
        
        
    },{timestamps:true})

    adminSchema.methods.matchPassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }

    const Admin = mongoose.model('Admin',adminSchema) 
    module.exports = Admin
