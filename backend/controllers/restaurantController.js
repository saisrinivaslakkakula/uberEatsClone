const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const Restaurant = require('../Models/RestaurantModel')
const addRestaurant = async (req, res) => {
    let { rest_name, rest_type, rest_category, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, rest_main_photo, checked, admId } = req.body
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
            res.status(201).json(
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
            )
        }
        else {
            res.status("400")
            throw new Error("400 Bad Request: Please try again later. ")
        }

    }

}


const updateRestaurant = async (req, res) => {
    let { rest_id, rest_name, rest_type, rest_email, rest_phone, rest_street, rest_city, rest_state, rest_country, rest_zipcode, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, checked } = req.body
    if (req.userAuth) {

        const restaurant = await Restaurant.findById(admin_id)
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
                res.status(201).json({

                    message: "Update Success!"

                })
            }
            else {
                throw new Error("Internal Server Error")
            }



        }

    }
    else {

    }





}

const getRestaurantProfile = async (req, res) => {

    const rest_id = req.params.id
    const restProfile = await Restaurant.findById(rest_id)
    if (restProfile) {
        res.send(restProfile)
    }
    else {
        res.status(400).send("Error: Restaurant details Not Found!")
    }
}

const getRestaurantProfileforAdmin = async (req, res) => {

    const admin_id = req.body.admin_id
    console.log(admin_id)
    const restProfile = await Restaurant.findOne({ adminId: admin_id })
    if (restProfile) {
        res.send(restProfile)
    }
    else {
        res.status(400).send("Error: Restaurant details Not Found!")
    }



}



const addmenuItem = async (req, res) => {
    const { rest_id, item_name, item_category, item_type, item_photo_path, item_desc, item_price } = req.body
   // console.log(item_photo_path)
    const restaurant = await Restaurant.findById(rest_id)
    if (restaurant) {
        const menuItem = {
            item_name, item_category, item_type, item_photo_path, item_desc, item_price
        }
        restaurant.rest_menu.push(menuItem)
        const result = restaurant.save()
        if (result) {
            res.status(200).json({
                message: "Item Added Successfully!"
            })

        }
        else {
            res.status(500).send("Error: Update failed due to internal server Error")
        }
    }
    else {
        res.status(400).send("Error: Restaurant not Found!")
    }





}


const getMenuByRestaurant = async (req, res) => {

    try {
        const restaurant = await Restaurant.findById(req.params.id)
        if (restaurant) {
            res.status(200).send(restaurant.rest_menu)
        }
        else {
            res.status(401).json({
                "message:": "Restaurant not Found!"
            })
        }
    }
    catch (err) {
        //console.log(req)
        res.status(500)
        throw new Error("Internal Server Error!")
    }






}

const updateMenuItem = async (req, res) => {

    const { rest_id, item_id, item_name, item_category, item_type, item_photo_path, item_desc, item_price } = req.body
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
                    res.send("Success!")
            }
        }

    } catch (error) {
            res.status(500).json({"Error":error})
    }


}


const deleteMenuItem = async (req, res) => {


    const { rest_id, item_id } = req.params

    const restaurant = await Restaurant.findById(rest_id)
    if (restaurant) {

        restaurant.rest_menu.pull({ '_id': item_id })
        const result = restaurant.save()
        if (result) {
            res.status(200).json({
                message: "Item removed Successfully!"
            })

        }
        else {
            res.status(500).send("Error: Update failed due to internal server Error")
        }
    }
    else {
        res.status(400).send("Error: Restaurant not Found!")
    }
    /*if (req.userAuth) {
        //console.log(req.body)
        db.query("SELECT * FROM menu WHERE item_id =?", [req.params.id], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error " + err
                })
            }

            let sql = "DELETE FROM `menu` \
            WHERE (`item_id` = ?)"
            //console.log(req.params.id)
            db.query(sql, req.params.id, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error. Please Try again Later. " + err
                    })
                }
                else {
                    res.json({
                        message: "Delete Success"

                    })
                }

            })

        })


    }
    else {
        res.status(401).json({
            message: " User Not Found!"
        })
    }*/



}

const getItemDetails = async (req, res) => {

    try {
        const restaurant = await Restaurant.findById(req.params.rest_id)
        if (restaurant) {
            const menu = restaurant.rest_menu
            const result = menu.find(x => JSON.stringify(x._id) === JSON.stringify(req.params.item_id))
            // menu.map(x=> console.log(JSON.stringify(x._id)))
            res.status(200).send(result)
        }
        else {
            res.status(401).json({
                "message:": "Restaurant not Found!"
            })
        }
    }
    catch (err) {
        res.status(500)
        throw new Error("Internal Server Error!" + err)
    }



}

const getAllRestaurants = async (req, res) => {

    const result = await Restaurant.find()
    if (result) {
        //console.log(result)
        res.status(200).json({ result })
    }
    else {
        res.status(400).json({
            message: "500 Internal Server Error"
        })
    }



}

const getRestaurantsByLocation = async (req, res) => {

    const result = await Restaurant.find({ 'rest_address.rest_city': req.params.id })
    if (result) {

        res.json(
            {
                result
            }

        )
    }

    else {

        res.status(500).json({
            "message:": "Internal Server Error"
        })
    }



}

module.exports = {
    addRestaurant, updateRestaurant, getRestaurantProfile, getAllRestaurants, getRestaurantProfileforAdmin,
    addmenuItem, getMenuByRestaurant, updateMenuItem, getItemDetails, deleteMenuItem,
    getRestaurantsByLocation
}