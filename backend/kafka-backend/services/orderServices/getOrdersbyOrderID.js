
const Order = require('../../../Models/orderModel')

const handle_request = async(msg, callback)=>{

    console.log("sdsd")
    try {
        console.log(msg)
        const orders = await Order.findById(msg.id)
    if(orders){
        
        callback(orders,null)
    }
    else{
        
        callback(null,"No Orders Found")
    }
        
    } catch (error) {
        console.log(error)
        callback(null,"Internal Server Error")
        
    }
    
    

  
};

exports.handle_request = handle_request;

