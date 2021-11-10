
const generateToken = require('../../utils/generateToken')
const db = require('../../dbCon')
const bcrypt = require('bcryptjs')
const User = require('../../Models/userModel')
const kafka = require('../../kafka/client')


const handle_request = async(msg, callback)=>{
    const { firstName, lastName, email, phone, password, Street, City, State, Country, ZipCode, image } = msg
    try {

        console.log(msg.userId)
        const user = await User.findById(msg.userId)
        if (user) {

            user.firstName = firstName || user.firstName
            user.lastName = lastName || user.lastName
            user.email = email || user.email
            if (msg.password) {
                const salt = await bcrypt.genSalt(10) // generate salt for bcrypt hash rounded to 10
                const Hashedpassword = await bcrypt.hash(password, salt)
                user.password = Hashedpassword
            }
            user.phone = phone || user.phone
            user.address.street = Street || user.address.street
            user.address.city = City || user.address.city
            user.address.state = State || user.address.state
            user.address.country = Country || user.address.country
            user.address.zipCode = ZipCode || user.address.zipCode
            const updatedUser = await user.save()
            const result = {
                id: msg.userId,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                favourites: updatedUser.favourites

            }

            callback(null,result)



        }
        else {
            const err = {
                "error":"Update Failed Please try again Later!"
            }
            callback( err,null);
        }
        
    } catch (error) {
        console.log(error)
        const err = {
            "error":"Internal Server Error"
        }
        callback( err,null);
    }
        
};

exports.handle_request = handle_request;