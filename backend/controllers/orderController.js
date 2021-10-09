const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')

const addOrder = async (req, res) => {
    let { cust_id,rest_id,order_date,order_status,items_array,items_total_price} = req.body
    /* Delete this if fails ****/
    if (!req.userAuth) {
        res.status(404).json({
            message: " Not Authorized"
        })
    }
    db.commit((err)=>{
        if (err) {
            res.status(500).json({
                message: " Internal Server Error"
            })
        }
        db.beginTransaction( (err)=>{
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error"
                })
            }
            let sql1 = "INSERT INTO `order` \
            (`cust_id`, `rest_id`, `order_date`, `order_status`, `order_total`) VALUES \
            (?,?, ?, ?, ?)"
            const Queryparams1 = [
                cust_id,rest_id,order_date,order_status,items_total_price
             ]
             db.query(sql1,Queryparams1,(err)=>{
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error"
                    })
                }
                db.query("SELECT LAST_INSERT_ID() as last_id", (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: " Internal Server Error"
                        })
                    }
                    var last_id = result[0].last_id;
                    let errorFlag = false;
                    for(let i=0; i< items_array.length;i++){
                        let sql = "INSERT INTO `order_details` \
                                                    ( `order_id`,\
                                                        `cust_id`, \
                                                        `rest_id`, \
                                                    `item_id`,\
                                                    `item_name`,\
                                                    `item_quantity`,\
                                                    `item_price`\
                                                    ) \
                                                    VALUES \
                                                    (\
                                                    ?, \
                                                    ?, \
                                                    ?, \
                                                    ?,\
                                                    ?,\
                                                    ?,\
                                                    ? \
                                                    );"
                        const Queryparams = [
                            last_id,cust_id,rest_id,items_array[i].item_id,
                            items_array[i].item_name,items_array[i].item_qty,
                            items_array[i].item_price
                        ]

                        db.query(sql,Queryparams, (err,result) => {
                            //console.log(Queryparams)
                            if (err) {
                                db.rollback((err)=>{
                                    console.log(err)
                                    errorFlag = true
                                })
                                return;
                            }
                            //console.log(result)
                            
                        })

                        

                    }
                    if(!errorFlag){
                        db.commit()
                        //db.end()
                        res.status(200).json({
                            message: "Success"
                        })
                    }
                    else{
                        res.status(500).json({
                            message: "Internal Server Error"
                        })
                    }
                    
                })
             })

        }

        )

    })
        



    /************************* */






    //console.log(req.body)

    /*let sql1 = "INSERT INTO `order` \
    (`cust_id`, `rest_id`, `order_date`, `order_status`, `order_total`) VALUES \
    (?,?, ?, ?, ?)"
     const Queryparams1 = [
        cust_id,rest_id,order_date,order_status,items_total_price
     ]
    if (req.userAuth) {

        try {
            //console.log(Queryparams1)
            db.query(sql1, Queryparams1, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error"+"1"+err
                    })
                }

                else {

                    db.query("SELECT LAST_INSERT_ID() as last_id", (err, result) => {
                        if (err) {
                            res.status(500).json({
                                message: " Internal Server Error"+"2"+err
                            })
                        }
                        else{
                            var last_id = result[0].last_id;
                            var errorflag = false
                             for(let i=0; i< items_array.length;i++){

                                        let sql = "INSERT INTO `order_details` \
                                                    ( `order_id`,\
                                                        `cust_id`, \
                                                        `rest_id`, \
                                                    `item_id`,\
                                                    `item_name`,\
                                                    `item_quantity`,\
                                                    `item_price`\
                                                    ) \
                                                    VALUES \
                                                    (\
                                                    ?, \
                                                    ?, \
                                                    ?, \
                                                    ?,\
                                                    ?,\
                                                    ?,\
                                                    ? \
                                                    );"
                                    const Queryparams = [
                                        last_id,cust_id,rest_id,items_array[i].item_id,
                                        items_array[i].item_name,items_array[i].item_quantity,
                                        items_array[i].item_price
                                    ]
                                   
                                    db.query(sql,Queryparams, (err, result) => {
                                        console.log(Queryparams)
                                        if (err) {
                                            console.log(err)
                                            errorflag = true
                                            return;
                                        }
                                        console.log(result)
                                    })
                                

                             } // for ends here
                             if(!errorflag){
                                res.status(200).json({
                                    message: "Success"
                                })
                             }
                                                
                        }
                        
                    })

                }

            })
        } catch (error) {
            console.log(error)
            throw new Error("Internal Server Error")

        }
    }
    else {
        throw new Error("Authentication Failed")
    }*/



}

const getordersByCustomerID = async (req, res) => {
    let sql = "SELECT * FROM `order` WHERE cust_id ='" + req.params.id + "'"
    //console.log(sql)
    db.query(sql, async (err,result)=>{
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
    let sql = "SELECT * FROM `order_details` WHERE order_id ='" + req.params.id + "'"
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
    })
}


const adminChangeOrderByID = async (req, res) => {
    let sql = "UPDATE `order` SET `order_status` = ? WHERE (`order_id` = ?);"
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
    })
}

const getordersByRestaurantID = async (req, res) => {
    let sql = "SELECT * FROM `order` WHERE rest_id ='" + req.params.id + "'"
    console.log(sql)
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
    })
}

module.exports = { addOrder,getordersByCustomerID,getOrderDetailsForCustomer,
    getordersByRestaurantID,getordersByOrderID,adminChangeOrderByID
 }