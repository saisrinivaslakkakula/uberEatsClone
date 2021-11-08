
const generateToken = require('../../utils/generateToken')
const db = require('../../dbCon')
const bcrypt = require('bcryptjs')
const User = require('../../Models/userModel')
const kafka = require('../../kafka/client')
const { Next } = require('react-bootstrap/esm/PageItem')


const handle_request = async(msg, callback)=>{
    const { firstName, lastName, email, phone, password, Street, City, State, Country, ZipCode, image } = msg
    const userExists = await User.findOne({ email:email })
    if (userExists) {
        callback({error:"USerExists"},null);
        
        
    }
    else{
        const salt = await bcrypt.genSalt(10) // generate salt for bcrypt hash rounded to 10
        const Hashedpassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: Hashedpassword,
            phone,
            address: {
                street: Street,
                city: City,
                state: State,
                country: Country,
                zipCode: ZipCode,
            },

            photo_path: image
        })
        if (user) {
            const result =  {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: generateToken(user._id),
                }
                callback(null,result)
            
        }
        else {
            callback( "Internal Server Error");
        }
    }
    /*
    const { firstName, lastName, email, phone, password, Street, City, State, Country, ZipCode, image } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).send("User Already Exists")
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
            address: {
                street: Street,
                city: City,
                state: State,
                country: Country,
                zipCode: ZipCode,
            },

            photo_path: image
        })
        if (user) {
            res.status(201).json(
                {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: generateToken(user._id),
                }
            )
        }
        else {
            res.status("400")
            throw new Error("400 Bad Request: Please try again later. ")
        }

    }*/
   
    
};

exports.handle_request = handle_request;