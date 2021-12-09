const User = require('../Models/userModel')
const Admin = require('../Models/adminModel')
const Restaurant = require('../Models/RestaurantModel')
const Order = require('../Models/orderModel')
const generateToken = require('../utils/generateToken')

const bcrypt = require('bcryptjs')
getTest = (args) => {
    return { "message": "this is test" }
}


addUser = async (args) => {
    console.log(args.userObj)
    const { firstName, lastName, email, phone, password, address, image, photo_path } = args.userObj
    const userExists = await User.findOne({ email })
    try {

        if (userExists) {
            throw new Error("User Exixts ")
        }
        else {
            const salt = await bcrypt.genSalt(10) // generate salt for bcrypt hash rounded to 10
            const Hashedpassword = await bcrypt.hash(password, salt)
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: Hashedpassword,
                phone,
                address,
                photo_path: photo_path
            })
            if (user) {

                const response = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: generateToken(user._id)

                }

                return response
            }
            else {

                throw new Error("400 Bad Request: Please try again later. ")

            }

        }

    } catch (error) {
        throw new Error(error)
    }

}

addAdmin = async (args) => {
    console.log(args.adminObj)
    const { firstName, lastName, email, phone, password, image } = args.adminObj
    const adminExists = await Admin.findOne({ email })
    try {

        if (adminExists) {
            throw new Error("Admin Exixts ")
        }
        else {
            const salt = await bcrypt.genSalt(10) // generate salt for bcrypt hash rounded to 10
            const Hashedpassword = await bcrypt.hash(password, salt)
            const admin = await Admin.create({
                firstName,
                lastName,
                email,
                password: Hashedpassword,
                phone,
                photo_path: image
            })
            if (admin) {
                const response = {
                    _id: admin._id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    token: generateToken(admin._id)

                }

                return response
            }
            else {
                res.status("400")
                throw new Error("400 Bad Request: Please try again later. ")
            }



        }

    } catch (error) {
        throw new Error(error)
    }

    // console.log(args.userObj.firstName)

}
addRestaurant = async (args) => {
    try {
        console.log(args.restaurantObj)
        let { rest_name, rest_type, rest_category, rest_email, rest_phone, rest_address, rest_open_day_from, rest_open_day_to, rest_open_time_from, rest_open_time_to, rest_desc, rest_main_photo, checked, adminId } = args.restaurantObj
        const restaurantExists = await Restaurant.findOne({ rest_email })
        if (restaurantExists) {
            throw new Error("Restaurant Exixts ")
        }
        else {
            //console.log("create")
            const restaurant = await Restaurant.create({
                rest_name,
                rest_type,
                rest_category,
                rest_email,
                rest_phone,
                rest_address,
                rest_open_day_from,
                rest_open_day_to,
                rest_open_time_from,
                rest_open_time_to,
                rest_desc,
                rest_main_photo,
                adminId
            })
            if (restaurant) {
                const response = 
                    {
                        _id: restaurant._id,
                        rest_name,
                        rest_email,
                        rest_phone,
                        rest_type,
                        rest_category,
                        rest_open_day_from,
                        rest_open_day_to,
                        rest_open_time_from,
                        rest_open_time_to,
                        rest_main_photo,
                        admin_id: adminId,
                        rest_desc
                    }
                return response
            }
            else {
                
                throw new Error("400 Bad Request: Please try again later. ")
            }

        }

    } catch (error) {
        throw new Error("400 Bad Request: Please try again later. "+error)
    }
}

addOrder = async(args)=>{

    
    let { cust_id,rest_id,order_status,order_details,order_total} = args.orderObj
    //console.log("********")
    console.log(order_details)
    let req = true
    /* Delete this if fails ****/
    if (!req) {
        throw new Error("Not Authorized ")
    }

    else{
        try {
            const order = await Order.create({
                cust_id,
                rest_id,
                order_status,
                order_total,
                order_details
            })
            if(order){
                return { "message": "this is test" }
            }
            else{
                throw new Error("Order Failed! ")

            }
            
        } catch (error) {
            throw new Error("Internal Server Error"+error)
            
        }
        
    }

}

updateOrder = async(args)=>{
    const orderID = args.orderID
    const orderStatus = args.orderStatus

    try {
        const order = await Order.findById(orderID)
        if(order){
            order.order_status = orderStatus
            const updatedOrder = await order.save()
            if(updatedOrder){
                console.log(updatedOrder)
                return { "message": "Update Success" }
            }
            else{
                throw new Error("Update Failed with 400 Error")
            }
        }
        else{
            throw new Error("Order Details Not Found")

        }
        
    } catch (error) {
        throw new Error("Internal Server Error")
        
    }

}

getAllRestaurants = async()=>{
    const result = await Restaurant.find()
    if (result) {
        //console.log(result)
        return result
    }
    else {
        throw new Error("Internal Server Error")
    }
}

getrestaurantByID = async(args)=>{
    const restProfile = await Restaurant.findById(args.id)
    if (restProfile) {
        return (restProfile)
    }
    else {
        throw new Error("Restaurant details not found")
    }
}

getrestaurantByLocation = async(args)=>{
    const restProfile = await Restaurant.find({ 'rest_address.rest_city': args.city })
    if (restProfile) {
        return (restProfile)
    }
    else {
        throw new Error("Restaurant details not found")
    }
}

getOrdersByCustID = async(args)=>{
    try {
        const orders = await Order.find({cust_id:args.cust_id})
    if(orders.length > 0){
        return orders
    }
    else{
        throw new Error("Order details not found")
    }
        
    } catch (error) {
        throw new Error("500 Internal server Error")
        
    }
}

getOrdersByRestID = async(args)=>{
    try {
        const orders = await Order.find({rest_id:args.rest_id})
    if(orders.length > 0){
        return orders
    }
    else{
        throw new Error("Order details not found")
    }
        
    } catch (error) {
        throw new Error("500 Internal server Error")
        
    }
}

getReceiptByOrder = async(args)=>{
    try {
        const orders = await Order.findByID(args.order_id)
    if(orders.length > 0){
        return orders
    }
    else{
        throw new Error("Order details not found")
    }
        
    } catch (error) {
        throw new Error("500 Internal server Error")
        
    }
}
exports.root = {
    getTest: getTest,
    addUser: addUser,
    addAdmin: addAdmin,
    addRestaurant:addRestaurant,
    addOrder:addOrder,
    updateOrder:updateOrder,
    getAllRestaurants:getAllRestaurants,
    getrestaurantByID:getrestaurantByID,
    getrestaurantByLocation,getrestaurantByLocation,
    getOrdersByCustID:getOrdersByCustID,
    getOrdersByRestID:getOrdersByRestID,
    getReceiptByOrder:getReceiptByOrder
}