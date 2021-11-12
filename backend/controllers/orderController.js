const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const Order = require('../Models/orderModel')
const kafka = require('../kafka/client')
const addOrder = async (req, res) => {

    if (!req.userAuth) {
        res.status(404).json({
            message: " Not Authorized"
        })
    }
    else{

        kafka.make_request('add_order', req.body, (err, results) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
    
            }
            else {
                console.log(results)
                res.status(201).json(
                    {
                        results
                    }
                )
            }
        })

    }



    /*
    let { cust_id,rest_id,order_status,items_array,items_total_price} = req.body
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
        
    }*/




}

const getordersByCustomerID = async (req, res) => {

    kafka.make_request('get_order_details_by_cust_id', req.params, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            console.log(results)
            res.status(201).json(
                {
                    results
                }
            )
        }
    })

   

    
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

    kafka.make_request('get_order_details_by_order_id', req.params, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            console.log(results)
            res.status(201).json(
                {
                    results
                }
            )
        }
    })
    
}


const adminChangeOrderByID = async (req, res) => {
    kafka.make_request('admin_change_order_status', req.params, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            console.log(results)
            res.status(201).json(
                {
                    results
                }
            )
        }
    })

   /* try {
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
        
    }*/
   
}

const getordersByRestaurantID = async (req, res) => {
    kafka.make_request('get_order_details_by_rest_id', req.params, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            console.log(results)
            res.status(201).json(
                {
                    results
                }
            )
        }
    })
}

module.exports = { addOrder,getordersByCustomerID,getOrderDetailsForCustomer,
    getordersByRestaurantID,getordersByOrderID,adminChangeOrderByID
 }