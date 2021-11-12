
const generateToken = require('../../utils/generateToken')
const db = require('../../dbCon')
const bcrypt = require('bcryptjs')
const User = require('../../Models/userModel')
const kafka = require('../../kafka/client')


const handle_request = async(msg, callback)=>{
    console.log(msg)
    //if (msg.userAuth) {
        console.log(msg.userId)
        const user = await User.findById(msg.userId)
        if (user) {
           const res = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone:user.phone,
                address:user.address,
                favourites:user.favourites

            }
            callback(null,res)

        }
        else {
            const err = {
                "error":"User Not Found"
            }
            callback( err,null);
        }
    //}
        
};

exports.handle_request = handle_request;