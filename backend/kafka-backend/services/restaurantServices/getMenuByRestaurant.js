

const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Restaurant = require('../../../Models/RestaurantModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{

    try {
        const restaurant = await Restaurant.findById(msg.id)
        if (restaurant) {
            callback(null,restaurant.rest_menu)
        }
        else {
            const err = {
                "error":"Restaurant Not Found!"
            }
            callback( err,null);
        }
    }
    catch (err) {
        //console.log(req)
        console.log(error)
        const err = {
            error:"Internal Server Error"
        }
        callback( err,null);
    }

};

exports.handle_request = handle_request;

