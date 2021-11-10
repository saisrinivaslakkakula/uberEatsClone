
const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Restaurant = require('../../../Models/RestaurantModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{

    try {

        let { rest_name, rest_type, rest_category, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, rest_main_photo, checked, admId } = msg
        //console.log(req.body)
        const restaurantExists = await Restaurant.findOne({ rest_email })
        if (restaurantExists) {
            res.status(400).send("Restaurant Already Exists")
        }
        else {
            const restaurant = await Restaurant.create({
                rest_name,
                rest_type,
                rest_category,
                rest_email,
                rest_phone,
                rest_address: {
                    rest_street,
                    rest_city,
                    rest_state,
                    rest_country,
                    rest_zipcode,
                },
                rest_open_day_from,
                rest_open_day_to,
                rest_open_time_from,
                rest_open_time_to,
                rest_desc,
                rest_main_photo,
                checked,
                adminId: admId
            })
            if (restaurant) {
                const result = 
                    {
                        _id: restaurant._id,
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
                        admin_id: admId,
                        rest_desc
                    }
                    callback(null,result)
            }
            else {
                const err = {
                    "error":"Unable to add the restaurant at this time. Please try again later."
                }
                callback( err,null);
            }
    
        }
        
    } catch (error) {
        const err = {
            "error":"Internal Server Error"
        }
        callback( err,null);
        
    }

};

exports.handle_request = handle_request;