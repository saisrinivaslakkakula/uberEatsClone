
const Order = require('../../../Models/orderModel')

const handle_request = async(msg, callback)=>{
    try {
        const order = await Order.findById(msg.id)
        if(order){
            order.order_status = msg.status
            const updatedOrder = await order.save()
            if(updatedOrder){
                callback("Success",null)
                
            }
            else{
                const err = {
                    "error":"Update Failed! Please try again later."
                }
                callback( err,null);
            }
        }
        else{
            const err = {
                "error":"order Deatils Not Found"
            }
            callback( err,null);

        }
        
    } catch (error) {
        console.log(error)
        const err = {
            "error":"Internal Server Error"
        }
        callback( err,null);
        
    }
    

  
};

exports.handle_request = handle_request;

