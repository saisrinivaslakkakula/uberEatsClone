const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')

const addOrder = async (req, res) => {
    let { cust_id,rest_id,order_date,order_status,item_id,item_name,item_quantity} = req.body
    //console.log(req.body)

    let sql1 = "INSERT INTO `order` \
    ( `cust_id`, \
        `rest_id`, \
     `order_date`,\
     `order_status`\
     ) \
     VALUES \
     (\
      ?, \
     ?, \
     ?,\
      ? \
     );"

     const Queryparams1 = [
        cust_id,rest_id,order_date,order_status
     ]
    if (req.userAuth) {

        try {

            db.query(sql1, Queryparams1, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error"
                    })
                }

                else {

                    db.query("SELECT LAST_INSERT_ID() as last_id", (err, result) => {
                        if (err) {
                            res.status(500).json({
                                message: " Internal Server Error"
                            })
                        }
                        else{
                            //console.log(result[0].last_id)
                            let sql = "INSERT INTO `order_details` \
                                            ( `order_id`,\
                                                `cust_id`, \
                                                `rest_id`, \
                                            `item_id`,\
                                            `item_name`,\
                                            `item_quantity`\
                                            ) \
                                            VALUES \
                                            (\
                                            ?, \
                                            ?, \
                                            ?, \
                                            ?,\
                                            ?,\
                                            ? \
                                            );"
                            const Queryparams = [
                                result[0].last_id,cust_id,rest_id,item_id,item_name,item_quantity
                            ]

                            db.query(sql,Queryparams, (err, result) => {
                                if (err) {
                                    res.status(500).json({
                                        message: " Internal Server Error"
                                    })
                                }
                                else{
                                        res.json({
                                            "message":"Done!"
                                        })
                                 }
                            })
                            
                                                
                        }
                        
                    })

                }

            })
        } catch (error) {
            //console.log(error)
            throw new Error("Internal Server Error")

        }
    }
    else {
        throw new Error("Authentication Failed")
    }



}

module.exports = { addOrder }