const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const bcrypt = require('bcryptjs')
const User = require('../Models/userModel')
const kafka = require('../kafka/client')
const addUser = async (req, res) => {

    kafka.make_request('add_user_db', req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        else {
            //console.log(results)
            res.status(200).send(
                
                results
            
        )
        }
    })


    /* const { firstName, lastName, email, phone, password, Street, City, State, Country, ZipCode, image } = req.body
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

}


const authUser = async (req, res) => {

    //console.log(req.userId)
    kafka.make_request('auth_user', req.userId, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err
            })

        }
        
        else {
            //console.log(results)
            res.setHeader('token', "jwt " + results.token);
            res.status(200).send(
                
                    results
                
            )
        }
    })

    /*const { email, password } = req.body
    const user = await User.findOne({ email: email })
    try {

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: generateToken(user._id), // token is generated by using a custom function and jsonwebtoken library. The custom function is available is utils/generatetokens.js
            })
        }
        else {
            res.status(400).json({
                "error":"Invalid username/Password'"
            })
           
        }
        
    } catch (error) {
        res.status(400).json({
            "error":"Invalid username/Password'"
        })
        
    }*/


}

const getUserProfile = async (req, res) => {
    //console.log(req)
    const msg = {
        userAuth: req.userAuth,
        userId: req.userId

    }
    //console.log(req.headers)

    kafka.make_request('get_user', msg, (err, results) => {
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

const addFavourite = async (req, res) => {
    if (req.userAuth) {
        const rest_id = req.params.rest_id
        const user = await User.findById(req.userId)
        if (user) {
            user.favourites.push(rest_id)
            console.log(user)
            const result = await user.save()
            if (result) {
                res.status(200).json({
                    "message": "success"

                })
            }
            else {
                res.status('500')
                throw new Error("Request Failer with status code 500.")
            }

        }
        else {
            res.status('404')
            throw new Error("user Not Found. Please try again")
        }
    }
    else {
        res.status(401)
        throw new Error("Error 401 - Not Authorized")
    }


}


const getUserFavourites = async (req, res) => {
    if (req.userAuth) {

        const user = await User.findById(req.userId)
        if (user) {
            const result = user.favourites;
            if (result) {
                res.status(200).json({
                    result

                })
            }
            else {
                res.status('500')
                throw new Error("Request Failed with status code 500.")
            }
        }
    }
    else {
        res.status(401)
        throw new Error("Error 401 - Not Authorized")
    }


}

const removeFavourites = async (req, res) => {
    if (req.userAuth) {
        const rest_id = req.params.rest_id
        const user = await User.findById(req.userId)
        if (user) {
            user.favourites.pull(rest_id)
            const result = await user.save()
            if (result) {
                res.status(200).json({
                    "message": "success"

                })
            }
            else {
                res.status('500')
                throw new Error("Request Failer with status code 500.")
            }

        }
        else {
            res.status('404')
            throw new Error("user Not Found. Please try again")
        }
    }
    else {
        res.status(401)
        throw new Error("Error 401 - Not Authorized")
    }


}

const updateUserProfile = async (req, res) => {


    if (req.userAuth) {
        const msg = {
            ...req.body,
            userId: req.userId
        }

        kafka.make_request('update_user', msg, (err, results) => {
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
        /*
        const { firstName, lastName, email, phone, password, Street, City, State, Country, ZipCode, image } = req.body
        const user = await User.findById(req.userId)
        if (user) {

            user.firstName = firstName || user.firstName
            user.lastName = lastName || user.lastName
            user.email = email || user.email
            if (req.body.password) {
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
            res.json({
                id: req.userId,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                favourites: updatedUser.favourites

            })



        }
        else {
            res.status(400).send("User does not Exist!")
        }
        */




    }
    else {
        res.status(401).json({
            message: " Authorization Error!"
        })
    }



}

module.exports = { addUser, authUser, getUserFavourites, addFavourite, getUserProfile, updateUserProfile, removeFavourites }