
const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Restaurant = require('../../../Models/RestaurantModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{

    try {

    const { rest_id, item_id } = msg
    console.log(rest_id)
    const restaurant = await Restaurant.findById(rest_id)
    if (restaurant) {

        restaurant.rest_menu.pull({ '_id': item_id })
        const result = restaurant.save()
        if (result) {
            const result = {
                message: "Item removed Successfully!"
            }

            callback(null,result)

        }
        else {

            callback("update Failed",null)
           
        }
    }
    else {
        callback("Restaurant Not Found!",null)
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