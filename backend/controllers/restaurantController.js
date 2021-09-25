const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const addRestaurant = async (req, res) => {
    const { rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, rest_main_photo } = req.body
    console.log(req.body)
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
                                message: " Internal Server Error:" + err
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
                                    message: " Internal Server Error:" + err
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

    let sql = "SELECT * FROM restaurant WHERE rest_id ='" + req.body.rest_id + "'"
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
                rest_desc: result[0].rest_desc

            })
        }
        else {
            res.status(401)
            throw new Error("Error 404 - Not Found")
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
                rest_desc: result[0].rest_desc

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

module.exports = { addRestaurant, getRestaurantProfile, getRestaurantProfileforAdmin,addmenuItem }