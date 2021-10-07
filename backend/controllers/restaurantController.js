const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const addRestaurant = async (req, res) => {
    let { rest_name, rest_type, rest_category, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, rest_main_photo, checked} = req.body
    //console.log(req.body)

    let id = crypto.createHash('sha256').update(rest_email + rest_name).digest('base64')
    let sql = "INSERT INTO `restaurant` \
    ( `rest_id`, \
        `rest_name`, \
    `rest_email`,\
     `rest_phone`, \
     `rest_street`, \
     `rest_city`, \
     `rest_state`, \
     `rest_country`, \
     `rest_zipcode`, \
     `rest_type`, \
     `rest_category`, \
     `rest_open_day_from`, \
     `rest_open_day_to`, \
     `rest_open_time_from`, \
     `rest_open_time_to`, \
     `rest_main_photo`, \
     `admin_id`,\
     `description`\
     ) \
     VALUES \
     (\
      ?, \
     ?, \
     ?,\
      ?, \
      ?, \
      ?, \
      ?, \
      ?, \
      ?, \
      ?,\
      ?, \
      ?, \
      ?, \
      ?, \
      ?,\
      ?, \
      ?, \
      ? \
     );"

    if (req.userAuth) {

        try {

            db.query("SELECT * FROM restaurant WHERE rest_id =?", [id], (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error"
                    })
                }

                if (result.length !== 0) {
                    res.status(401).json({
                        message: " Restaurant Already Exists!"
                    })
                }
                else {

                    if(checked){
                        rest_open_day_from = "All Days"
                        rest_open_day_to = "NA"
                    }
                     
                    const Queryparams = [
                        id,
                        rest_name,
                        rest_email,
                        rest_phone,
                        rest_street,
                        rest_city,
                        rest_state,
                        rest_country,
                        rest_zipcode,
                        rest_type,
                        rest_category,
                        rest_open_day_from,
                        rest_open_day_to,
                        rest_open_time_from,
                        rest_open_time_to,
                        rest_main_photo,
                        req.userId,
                        rest_desc

                    ]
                    db.query(sql, Queryparams, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                message: " Internal Server Error:"+err
                            })
                        }
                        else {

                            if (result) {
                                res.status(201).json({
                                    rest_id: id,
                                    rest_name,
                                    rest_email,
                                    rest_phone,
                                    rest_street,
                                    rest_city,
                                    rest_state,
                                    rest_country,
                                    rest_zipcode,
                                    rest_type,
                                    rest_category,
                                    rest_open_day_from,
                                    rest_open_day_to,
                                    rest_open_time_from,
                                    rest_open_time_to,
                                    rest_main_photo,
                                    admin_id: req.userId,
                                    rest_desc

                                })
                            }
                            else {
                                res.status(500).json({
                                    message: " Internal Server Error:"
                                })
                            }
                        }


                    })

                }

            })
        } catch (error) {
            throw new Error("Internal Server Error")

        }
    }
    else {
        throw new Error("Authentication Failed")
    }



}


const updateRestaurant = async (req, res) => {
    let { rest_id,rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, checked} = req.body
    //console.log(req.body)
    
    let sql = "UPDATE `restaurant` SET\
    `rest_name`=?, \
    `rest_email`=?,\
     `rest_phone`=?, \
     `rest_street`=?, \
     `rest_city`=?, \
     `rest_state`=?, \
     `rest_country`=?, \
     `rest_zipcode`=?, \
     `rest_type`=?, \
     `rest_open_day_from`=?, \
     `rest_open_day_to`=?, \
     `rest_open_time_from`=?, \
     `rest_open_time_to`=?, \
     `admin_id`=?,\
     `description`=?\
     WHERE \
     (\
      `rest_id`=?\
     );"

    if (req.userAuth) {

        try {

            //console.log("!!!!!!!!"+rest_id)
            db.query("SELECT * FROM restaurant WHERE rest_id =?", [rest_id], (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error"
                    })
                }

                if (result && result.length === 0) {
                    res.status(401).json({
                        message: " Restaurant Not Found!"
                    })
                }
                else {

                    if(checked){
                        rest_open_day_from = "All Days"
                        rest_open_day_to = "NA"
                    }
                     
                    const Queryparams = [
                        rest_name,
                        rest_email,
                        rest_phone,
                        rest_street,
                        rest_city,
                        rest_state,
                        rest_country,
                        rest_zipcode,
                        rest_type,
                        rest_open_day_from,
                        rest_open_day_to,
                        rest_open_time_from,
                        rest_open_time_to,
                        req.userId,
                        rest_desc,
                        rest_id

                    ]
                    //console.log(sql)
                    db.query(sql, Queryparams, (err, result) => {
                        if (err) {
                            res.status(500).json({
                                message: " Internal Server Error:"+err
                            })
                        }
                        else {

                            if (result) {
                                res.status(201).json({
                                    /*rest_id: id,
                                    rest_name,
                                    rest_email,
                                    rest_phone,
                                    rest_street,
                                    rest_city,
                                    rest_state,
                                    rest_country,
                                    rest_zipcode,
                                    rest_type,
                                    rest_open_day_from,
                                    rest_open_day_to,
                                    rest_open_time_from,
                                    rest_open_time_to,
                                    rest_main_photo,
                                    admin_id: req.userId,
                                    rest_desc*/
                                    message:"Update Success!"

                                })
                            }
                            else {
                                res.status(500).json({
                                    message: " Internal Server Error:"
                                })
                            }
                        }


                    })

                }

            })
        } catch (error) {
            throw new Error("Internal Server Error")

        }
    }
    else {
        throw new Error("Authentication Failed")
    }



}

const getRestaurantProfile = async (req, res) => {

    let sql = "SELECT * FROM restaurant WHERE rest_id ='" + req.params.id+ "'"
    db.query(sql, (err, result) => {
        if (err) {
            throw new Error(err)
        }
        if (result.length === 1) {
            //console.log(result[0])
            res.json({
                rest_id: result[0].rest_id,
                rest_name: result[0].rest_name,
                rest_email: result[0].rest_email,
                rest_phone: result[0].rest_phone,
                rest_street: result[0].rest_street,
                rest_city: result[0].rest_city,
                rest_state: result[0].rest_state,
                rest_country: result[0].rest_country,
                rest_zipcode: result[0].rest_zipcode,
                rest_type: result[0].rest_type,
                rest_open_day_from: result[0].rest_open_day_from,
                rest_open_day_to: result[0].rest_open_day_to,
                rest_open_time_from: result[0].rest_open_time_from,
                rest_open_time_to: result[0].rest_open_time_to,
                rest_main_photo: result[0].rest_main_photo,
                rest_desc: result[0].description

            })
        }
        else {
            res.status(401).json({
                "message:": "Restaurant Not Found!"
            })
        }
    })
}

const getRestaurantProfileforAdmin = async (req, res) => {

    let sql = "SELECT * FROM restaurant WHERE admin_id ='" + req.body.admin_id + "'"
    //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) {
            throw new Error(err)
        }
        if (result.length === 1) {
            //console.log(result[0])
            res.json({
                rest_id: result[0].rest_id,
                rest_name: result[0].rest_name,
                rest_email: result[0].rest_email,
                rest_phone: result[0].rest_phone,
                rest_street: result[0].rest_street,
                rest_city: result[0].rest_city,
                rest_state: result[0].rest_state,
                rest_country: result[0].rest_country,
                rest_zipcode: result[0].rest_zipcode,
                rest_type: result[0].rest_type,
                rest_open_day_from: result[0].rest_open_day_from,
                rest_open_day_to: result[0].rest_open_day_to,
                rest_open_time_from: result[0].rest_open_time_from,
                rest_open_time_to: result[0].rest_open_time_to,
                rest_main_photo: result[0].rest_main_photo,
                rest_desc: result[0].description

            })
        }
        else {
            res.status(401).json({
                "message:": "Restaurant Not Found!"
            })

        }
    })



}



const addmenuItem = async (req, res) => {
    const { rest_id, item_name, item_category, item_type, item_photo_path, item_desc } = req.body
    //console.log(req.body)
    let menu_id = crypto.createHash('sha256').update(rest_id + item_name).digest('base64')
    let sql = "INSERT INTO `menu` \
    ( `item_id`, \
    `rest_id`, \
        `item_name`, \
    `item_category`,\
     `item_type`, \
     `item_photo_path`, \
     `item_desc` \
     ) \
     VALUES \
     (\
      ?, \
     ?, \
     ?,\
      ?, \
      ?, \
      ?, \
      ? \
     );"

    try {

        db.query("SELECT * FROM menu WHERE item_id =?", [menu_id], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error"+err
                })
            }

            if (!result || result.length !== 0) {
                res.status(401).json({
                    message: " Item Already Exists!"
                })
            }
            else {
                const Queryparams = [
                    menu_id,
                    rest_id,
                    item_name,
                    item_category,
                    item_type,
                    item_photo_path,
                    item_desc

                ]
                db.query(sql, Queryparams, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: " Internal Server Error:" + err
                        })
                    }
                    else {

                        if (result) {
                            res.status(201).json({
                                menu_id,
                                rest_id,
                                item_name,
                                item_category,
                                item_type,
                                item_photo_path,
                                item_desc

                            })
                        }
                        else {
                            res.status(500).json({
                                message: " Internal Server Error:" + err
                            })
                        }
                    }


                })

            }

        })
    } catch (error) {
        throw new Error("Internal Server ErrorR")

    }




}


const getMenuByRestaurant = async (req, res) => {

    let sql = "SELECT * FROM menu WHERE rest_id ='" + req.params.id + "'"
   //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) {
            throw new Error(err)
        }
        if (result.length >= 1) {
            //console.log(result[0])
            res.send(
                result)
        }
        else {
            res.status(401).json({
                "message:": "No Menu Items / Restaurant not Found!"
            })

        }
    })



}

const updateMenuItem = async (req, res) => {

    //console.log("sasdad!!!")
    if (req.userAuth) {
        //console.log(req.body)
        db.query("SELECT * FROM menu WHERE item_id =?", [req.body.item_id], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error "+err
                })
            }
            if(result.length !== 0){

                let sql = "UPDATE `menu` SET \
                `item_name`= ? ,\
                `item_category` = ?  ,\
                `item_type`= ? ,\
                `item_photo_path` = ?  ,\
                `item_desc`= ? ,\
                `item_price`= ? \
                WHERE (`item_id` = ?)"
    
                //console.log(sql)
                let paramsArray = [req.body.item_name,
                req.body.item_category,
                req.body.item_type,
                req.body.item_photo_path,
                req.body.item_desc,
                req.body.item_price,
                req.body.item_id
                ]
                //console.log(paramsArray)
                db.query(sql, paramsArray, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: " Internal Server Error. Please Try again Later. "+err
                        })
                    }
                    else {
                        //console.log(result)
                        res.json({
                        message:"Update Success"
    
                    })
                    }
    
                })

            }
            else{
                res.status(401).json({
                    message: " Menu Item Not Found!"
                })
            }


        })


    }
    else {
        res.status(401).json({
            message: " Unauthorized Access!"
        })
    }



}


const deleteMenuItem = async (req, res) => {


    if (req.userAuth) {
        //console.log(req.body)
        db.query("SELECT * FROM menu WHERE item_id =?", [req.params.id], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error "+err
                })
            }

            let sql = "DELETE FROM `menu` \
            WHERE (`item_id` = ?)"
            //console.log(req.params.id)
            db.query(sql, req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error. Please Try again Later. "+err
                    })
                }
                else {
                    res.json({
                    message:"Delete Success"

                })
                }

            })

        })


    }
    else {
        res.status(401).json({
            message: " User Not Found!"
        })
    }



}

const getItemDetails = async (req, res) => {

    let sql = "SELECT * FROM menu WHERE item_id ='" + req.params.id + "'"
   //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) {
            throw new Error(err)
        }
        if (result.length >= 1) {
            //console.log(result[0])
            res.json(
                result[0])
        }
        else {
            res.status(401).json({
                "message:": "Item Not Found"
            })

        }
    })



}

const getAllRestaurants = async (req, res) => {

    let sql = "SELECT * FROM restaurant"
   //console.log(sql)
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({
                "message:": "Internal Server Error"
            })
        }
    
        else {
            res.json(
                {
                    result
                }
                
                )

        }
    })


}

module.exports = { addRestaurant, updateRestaurant,getRestaurantProfile, getAllRestaurants, getRestaurantProfileforAdmin,addmenuItem,getMenuByRestaurant,updateMenuItem,getItemDetails,deleteMenuItem}