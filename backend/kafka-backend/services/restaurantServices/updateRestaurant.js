
const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Restaurant = require('../../../Models/RestaurantModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{

    try {

        let { rest_id, rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, checked } = msg
        console.log(msg)
        const restaurant = await Restaurant.findById(rest_id)
        if (!restaurant) {
            res.status(400).json({

                error: "Restaurant does not exist!"

            })

        }
        else {


            restaurant.rest_name = rest_name
            restaurant.rest_type = rest_type
            restaurant.rest_email = rest_email
            restaurant.rest_phone = rest_phone
            restaurant.rest_address.rest_street = rest_street
            restaurant.rest_address.rest_city = rest_city
            restaurant.rest_address.rest_state = rest_state
            restaurant.rest_address.rest_state = rest_state
            restaurant.rest_address.rest_country = rest_country
            restaurant.rest_address.rest_zipcode = rest_zipcode
            restaurant.rest_open_day_from = rest_open_day_from || restaurant.rest_open_day_from
            restaurant.rest_open_day_to = rest_open_day_to || restaurant.rest_open_day_to
            restaurant.rest_open_time_from = rest_open_time_from || restaurant.rest_open_time_from
            restaurant.rest_open_time_to = rest_open_time_to || restaurant.rest_open_time_to,
                restaurant.rest_desc = rest_desc
            const updatedRestaurant = await restaurant.save()
            if (updatedRestaurant) {
                callback(null,updatedRestaurant)
            }
            else {
                
                const err = {
                    "error":"Internal Server Error"
                }
                callback( err,null);
            }
        
        }
        
    } catch (error) {
        console.log(error)
        const err = {
            "error":"Internal Server Error"+error
        }
        callback( err,null);
        
    }

};

exports.handle_request = handle_request;