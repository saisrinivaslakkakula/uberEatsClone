const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')

const orderSchema = mongoose.Schema({
        cust_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
            
        },
        rest_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Restaurant'
            
        },
        order_date:{
            type:Date,
            default: Date.now
        },
        order_status:{
            type:String,
            required:true
        },
        order_total:{
            type:Number,
            reqired:true
        },
        special_instructions: {
            type:String
        },

        order_details:[
            {
                item_name:{type:String},
                item_qty:{type:Number},
                item_price:{type:Number},
            }
        ]
 
        
    },{timestamps:true})

    

    const Order = mongoose.model('Order',orderSchema) 
    module.exports = Order
