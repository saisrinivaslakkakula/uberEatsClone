const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const Order = require('../Models/orderModel')
const addOrder = async (req, res) => {
    let { cust_id,rest_id,order_status,items_array,items_total_price} = req.body
    /* Delete this if fails ****/
    if (!req.userAuth) {
        res.status(404).json({
            message: " Not Authorized"
        })
    }

    else{
        try {
            const order = await Order.create({
                cust_id,
                rest_id,
                order_status,
                order_total:items_total_price,
                order_details:items_array
            })
            if(order){
                res.status(200).json({
                    message: "Success"
                })
            }
            else{
                res.status(400).json({
                    message: "Order Fail!"
                })

            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error
            })
            
        }
        
    }




}

const getordersByCustomerID = async (req, res) => {

    try {
        const orders = await Order.find({cust_id:req.params.id})
    if(orders.length > 0){
        res.status(200).json({
            "result":orders
        })
    }
    else{
        res.status(404).json({
            "error":"No Orders Found"
        })
    }
        
    } catch (error) {
        res.status(500).json({
            "error":"Internal Server Error."
        })
        
    }
    

    
}

const getOrderDetailsForCustomer = async (req,res) =>{
    // SELECT od.cust_id, od.order_id,od.rest_id,od.item_name,od.item_id,od.item_quantity,o.order_date,o.order_status from ubereats.order_details od inner join ubereats.order o on o.order_id = od.order_id;
    /*let sql = "SELECT od.cust_id, od.order_id,od.rest_id,od.item_name,od.item_id,od.item_quantity,o.order_date,o.order_status,o.order_total from ubereats.order_details od inner join ubereats.order o on o.order_id = od.order_id where o.cust_id = '"+req.params.id+"' group by o.order_id"
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json(
                {
                    "error":"500 - internal Server error"+err
                }
            )
        }
        else{
            res.status(201).json({
                "result":result
            })
        }
})*/


 let sql = "SELECT od.cust_id, od.order_id,od.rest_id,od.item_name,od.item_id,od.item_quantity,o.order_date,o.order_status from ubereats.order_details od inner join ubereats.order o on o.order_id = od.order_id group by o.order_id"
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            res.status(500).json(
                {
                    "error":"500 - internal Server error"+err
                }
            )
        }
        else{
            console.log(result)
            
        }
})

}

const getordersByOrderID = async (req, res) => {
    try {
        console.log(req.params.id)
        const order = await Order.findById(req.params.id)
        //console.log(order)
    if(order){
        res.status(200).json({
            "result":order
        })
    }
    else{
        res.status(404).json({
            "error":"No Orders Found"
        })
    }
        
    } catch (error) {
        res.status(500).json({
            "error":"Internal Server Error."
        })
        
    }
}


const adminChangeOrderByID = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id)
        if(order){
            order.order_status = req.params.status
            const updatedOrder = await order.save()
            if(updatedOrder){
                res.status(201).json({
                    "result":"success"
                })
            }
            else{
                res.status(400).json(
                    {
                        "error":"Update Failed. Please try again Later"
                    }
                )
            }
        }
        else{
            res.status(404).json(
                {
                    "error":"Order Details not Found. Please try again Later"
                }
            )

        }
        
    } catch (error) {
        res.status(500).json(
            {
                "error":"Internal Server Error"
            }
        )
        
    }
    /*let sql = "UPDATE `order` SET `order_status` = ? WHERE (`order_id` = ?);"
    db.query(sql,[req.params.status,req.params.id],(err,result)=>{
            if(err){
                res.status(500).json(
                    {
                        "error":"500 - internal Server error"+err
                    }
                )
            }
            else{
                res.status(201).json({
                    "result":"success"
                })

            }
    })*/
}

const getordersByRestaurantID = async (req, res) => {
    try {
        console.log(req.params.id)
        const orders = await Order.find({rest_id:req.params.id})
        //console.log(order)
    if(orders){
        res.status(200).json({
            "result":orders
        })
    }
    else{
        res.status(404).json({
            "error":"No Orders Found"
        })
    }
        
    } catch (error) {
        res.status(500).json({
            "error":"Internal Server Error."
        })
        
    }
}

module.exports = { addOrder,getordersByCustomerID,getOrderDetailsForCustomer,
    getordersByRestaurantID,getordersByOrderID,adminChangeOrderByID
 }