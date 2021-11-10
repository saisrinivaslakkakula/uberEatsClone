const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const bcrypt = require('bcryptjs')
const Admin = require('../Models/adminModel')
const kafka = require('../kafka/client')
const addAdmin = async (req, res) => {


    kafka.make_request('add_admin', req.body, (err, results) => {
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

   /* const { firstName, lastName, email, phone, password, image } = req.body

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
            res.status(201).json(
                {
                    _id: admin._id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    token: generateToken(admin._id),
                }
            )
        }
        else {
            res.status("400")
            throw new Error("400 Bad Request: Please try again later. ")
        }

    }*/

    

}


const authAdmin = async (req, res) => {
    kafka.make_request('auth_admin', req.body, (err, results) => {
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

   /* const { email, password } = req.body
    const admin = await Admin.findOne({ email: email })
    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            token: generateToken(admin._id), // token is generated by using a custom function and jsonwebtoken library. The custom function is available is utils/generatetokens.js
        })
    }
    else {
        res.status(401).json({
                "Error":"Invalid username/Password"
        })
        
    }*/

}

const getAdminProfile = async (req, res) => {
    if (req.userAuth) {
        const msg = {
            ...req.body,
            userId:req.userId
        }
        kafka.make_request('get_admin', msg, (err, results) => {
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


}


const updateAdminProfile = async (req, res) => {


    if (req.userAuth) {

        db.query("SELECT * FROM users WHERE admin_id =?", [req.userId], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error"
                })
            }

            let sql = "UPDATE `users` SET \
            `firstName`= ? ,\
            `lastName` = ?  ,\
            `email`= ? ,\
            `phone` = ?  ,\
            `street`= ? ,\
            `city` = ?  ,\
            `state`= ? ,\
            `country` = ?  ,\
            `zipcode`= ? \
            WHERE (`id` = ?)"

            //console.log(req.body)
            let paramsArray = [req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.phone,
            req.body.Street,
            req.body.City,
            req.body.State,
            req.body.Country,
            req.body.ZipCode,
            req.userId
            ]
            db.query(sql, paramsArray, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: " Internal Server Error. Please Try again Later."
                    })
                }
                else {
                    res.json({
                    _id: req.userId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    token: generateToken(req.userId),

                })
                }

            })

        })


    }
    else {
        res.status(401).json({
            message: " User Not Found!"
        })
    }



}

module.exports = { addAdmin, authAdmin, getAdminProfile, updateAdminProfile }