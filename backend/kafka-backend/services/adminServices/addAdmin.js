
const generateToken = require('../../../utils/generateToken')
const db = require('../../../dbCon')
const bcrypt = require('bcryptjs')
const Admin = require('../../../Models/adminModel')
const kafka = require('../../../kafka/client')


const handle_request = async(msg, callback)=>{

    try {
        const { firstName, lastName, email, phone, password, image } = msg
    const adminExists = await Admin.findOne({ email })
    if (adminExists) {
        res.status(400).send("User Already Exists")
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
            const result = {
                    _id: admin._id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    token: generateToken(admin._id),
                }
                callback(null,result)
        }
        else {
            const err = {
                "error":"Unable to process the Request. Please try again later."
            }
            callback( err,null);
        }

    }
        
    } catch (error) {
        console.log(error)
        const err = {
            "error":"Internal Server Error. Please try again later"
        }
        callback( err,null);
        
    }
    

  
};

exports.handle_request = handle_request;