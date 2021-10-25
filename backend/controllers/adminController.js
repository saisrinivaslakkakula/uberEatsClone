const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const bcrypt = require('bcryptjs')
const addAdmin = async (req, res) => {
    const { firstName, lastName, email, phone, password, image } = req.body
    //console.log(req.body)
    let id = crypto.createHash('sha256').update(email + firstName).digest('base64')
    const Hashedpassword = crypto.createHash('sha256').update(password).digest('base64')
    let sql = "INSERT INTO `admin` (`admin_id`,`firstName`, `lastName`, `email`, `password`, `phone`,`photoPath`) VALUES ('" + id + "', '" + firstName + "', '" + lastName + "','" + email + "','" + Hashedpassword + "','" + phone + "','" +image+"' ) "
    //console.log(id)
   // let sql = "INSERT INTO `users` (`id`,`firstName`, `lastName`, `email`, `password`, `phone`, `street`, `city`, `state`,`country`,`zipcode`,`photo_path`) \
   //                         VALUES ('?','?','?','?','?','?','?','?','?','?','?','?' )"
   //console.log(sql)
    try {

        db.query("SELECT * FROM admin WHERE email =?", [email], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error"
                })
            }

            if (result.length !== 0) {
                res.status(401).json({
                    message: " Email Already Exists!"
                })
            }
            else {
                const queryparams = [
                        id,
                        firstName,
                        lastName,
                        email,
                        Hashedpassword,
                        phone,
                        image


                ]
                db.query(sql, queryparams,(err, result) => {
                    if (err) {
                        res.status(500).json({
                            message: " Internal Server Error:"+err
                        })
                    }
                    else{

                        res.status(201).json({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phone: phone,
                            token: generateToken( id),
    
                        })

                    }


                })

            }

        })
    } catch (error) {
        throw new Error("Internal Server Error")

    }

}


const authAdmin = async (req, res) => {
    const { email, password } = req.body
    const Hashedpassword = crypto.createHash('sha256').update(password).digest('base64')
    db.query("SELECT * FROM admin WHERE email =?", [email], (err, result) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        }
        if (result.length === 1) {
            if (result[0].password === Hashedpassword) {
                res.json({
                    _id: result[0].admin_id,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    phone: result[0].phone,
                    restraunt_id:result[0].rest_id,
                    image:result[0].photoPath,
                    token: generateToken(result[0].admin_id),
                    
                })
            }
            else {

                res.status(400).json({
                    message: "Email Id/ Password doesn't match. Please try again."
                })
            }
        }
        else {
            res.status(400).json({
                message: "Email Id/ Password doesn't match. Please try again."
            })
        }


    })

}

const getAdminProfile = async (req, res) => {
    //console.log(req)
    if (req.userAuth) {
        db.query("SELECT * FROM admin WHERE admin_id =?", [req.userId], (err, result) => {
            if (err) {
                throw new Error(err)
            }
            if (result.length === 1) {
                //console.log(result[0])
                res.json({
                    _id: result[0].admin_id,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    phone: result[0].phone,
                    image:result[0].photo_path,

                })
            }
            else {
                res.status(401)
                throw new Error("Error 401 - Not Authorized")
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