
const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Order = require('../../../Models/orderModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{

    let { cust_id,rest_id,order_status,items_array,items_total_price,special_instructions} = msg
        try {
            const order = await Order.create({
                cust_id,
                rest_id,
                order_status,
                order_total:items_total_price,
                order_details:items_array,
                special_instructions
            })
            if(order){
                const result = {
                    message: "Success"
                }
                callback(null,result)
            }
            else{
                callback("Order Fail!",null)
            }
            
        } catch (error) {
            callback("Internal Server Error",null)
            
        }
    
    

  
};

exports.handle_request = handle_request;