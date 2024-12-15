const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')

const restaurantSchema = mongoose.Schema({
        rest_name:{
            type:String,
            reqired:true
            
        },
        rest_email:{
            type:String,
            unique:true,
            reqired:true
        },
        rest_phone:{
            type:String,
            reqired:true
        },
        rest_address:{
            rest_street:{
                type:String,
                required:true
            },
            rest_city:{
               type:String,
               required:true
           },
           rest_state:{
               type:String,
               required:true
           },
           rest_zipcode:{
               type:String,
               
           }
           
            
        },
        rest_type:{
            type:String,
            reqired:true
        },
        rest_category:{
            type:String,
            reqired:true
        },
        rest_open_day_from:{
            type:String,
        },
        rest_open_day_to:{
            type:String,
        },
        rest_open_time_from:{
            type:String,
        },
        rest_open_time_to:{
            type:String,
        },
        rest_main_photo:{
            type:String
        },
        adminId:{
            type:String
        },
        rest_desc:{
            type:String
        },
        rest_menu:[
            {
                item_name:{type:String},
                item_category:{type:String},
                item_type:{type:String},
                item_photo_path:{type:String},
                item_description:{type:String},
                item_price:{type:Number},
            }
        ]
 
        
    },{timestamps:true})

    

    const Restaurant = mongoose.model('Restaurant',restaurantSchema) 
    module.exports = Restaurant
