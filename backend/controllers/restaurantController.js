const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const Restaurant = require('../Models/RestaurantModel')
const kafka = require('../kafka/client')
const addRestaurant = async (req, res) => {

    kafka.make_request('add_restaurant', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        if (results.error) {

            res.status(500).json({
                error: results.error
            })
        }
        else {
            console.log(results)
            res.status(201).json(
                {
                    results
                }
            )
        }
    })

   

}


const updateRestaurant = async (req, res) => {
   
    if (req.userAuth) {
        

        kafka.make_request('update_restaurant', req.body, (err, results) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
    
            }
            else {
                res.status(200).send(
                    
                        results
                    
                )
            }
        })


        

    }
    else {
        res.status(500).json({
            error: "Authorization Failed"
        })

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

    const admin_id = req.params.id
    const restProfile = await Restaurant.findOne({ admin_id: admin_id })
    if (restProfile) {
        res.send(restProfile)
    }
    else {
        res.status(400).send("Error: Restaurant details Not Found!")
    }



}



const addmenuItem = async (req, res) => {

    kafka.make_request('add_menu_item', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        if (results.error) {

            res.status(500).json({
                error: results.error
            })
        }
        else {
            console.log(results)
            res.status(201).json(
                {
                    results
                }
            )
        }
    })


}


const getMenuByRestaurant = async (req, res) => {

    kafka.make_request('get_menu_for_restaurant', req.params, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        
        else {
            console.log(results)
            res.status(201).send(
                
                    results
                
            )
        }
    })

}

const updateMenuItem = async (req, res) => {

    kafka.make_request('edit_menu_for_restaurant', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        
        else {
            console.log(results)
            res.status(201).send(
                
                    results
                
            )
        }
    })


    /*

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
    */


}


const deleteMenuItem = async (req, res) => {

    kafka.make_request('delete_menu_for_restaurant', req.params, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        
        else {
            console.log(results)
            res.status(201).send(
                
                    results
                
            )
        }
    })

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