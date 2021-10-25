const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
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
        address:{
             street:{
                 type:String,
                 required:true
             },
             city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            country:{
                type:String,
                required:true
            },
            zipCode:{
                type:String,
                required:true
            }
        },
        photo_path:{
            type:String
        },
        favourites:[{type:String}]
        
    },{timestamps:true})

    userSchema.methods.matchPassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }

    const User = mongoose.model('User',userSchema) 
    module.exports = User
