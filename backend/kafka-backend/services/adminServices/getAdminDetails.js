
const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Admin = require('../../../Models/adminModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{
    //console.log(msg)
       // console.log(msg.userId)
        const admin = await Admin.findById(msg.userId)
        if (admin) {
           const res = {
                _id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                phone:admin.phone,
                address:admin.address,
                favourites:admin.favourites

            }
            callback(null,res)

        }
        else {
            const err = {
                "error":"admin Not Found"
            }
            callback( err,null);
        }

        
};

exports.handle_request = handle_request;