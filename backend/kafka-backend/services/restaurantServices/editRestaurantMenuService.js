
const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Restaurant = require('../../../Models/RestaurantModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{

    const { rest_id, item_id, item_name, item_category, item_type, item_photo_path, item_desc, item_price } = msg
    try {
        const restaurant = await Restaurant.findById(rest_id)
        if (restaurant) {
            const updatedRestaurant = await Restaurant.updateOne({ _id: rest_id, 'rest_menu._id': item_id },
                {
                    $set: {
                        'rest_menu.$.item_name': item_name,
                        'rest_menu.$.item_category': item_category,
                        'rest_menu.$.item_type': item_type,
                        'rest_menu.$.item_desc': item_desc,
                        'rest_menu.$.item_price': item_price,
                    }
                })
            if (updatedRestaurant) { 
                callback(null,"Success")
                    
            }
        }
        else{
            callback("Restaurant Not Found",null)

        }

    } catch (error) {
        callback(error,null)
    }

};

exports.handle_request = handle_request;