const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const bcrypt = require('bcryptjs')
const addUser = async (req, res) => {
    const { firstName, lastName, email, phone, password, Street, City, State, Country, ZipCode, image } = req.body
    //console.log(req.body)
    let id = crypto.createHash('sha256').update(email + firstName).digest('base64')
    const Hashedpassword = crypto.createHash('sha256').update(password).digest('base64')
    //console.log(Hashedpassword+"~~~")
    let sql = "INSERT INTO `users` (`id`,`firstName`, `lastName`, `email`, `password`, `phone`, `street`, `city`, `state`,`country`,`zipcode`, `photo_path`) VALUES ('" + id + "', '" + firstName + "', '" + lastName + "','" + email + "','" + Hashedpassword + "','" + phone + "','" + Street + "','" + City + "','" + State + "','" + Country + "','" + ZipCode +"','"+image+"' ) "

   // let sql = "INSERT INTO `users` (`id`,`firstName`, `lastName`, `email`, `password`, `phone`, `street`, `city`, `state`,`country`,`zipcode`,`photo_path`) \
   //                         VALUES ('?','?','?','?','?','?','?','?','?','?','?','?' )"
    try {

        db.query("SELECT * FROM users WHERE email =?", [email], (err, result) => {
            if (err) {
                res.status(500).json({
                    message: " Internal Server Error"
                })
            }

            if (result.length !== 0) {
                res.status(401).json({
                    message: " User Already Exists!"
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
                        Street,
                        City,
                        Country,
                        ZipCode,
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
                            Street: Street,
                            City: City,
                            State: State,
                            Country: Country
    
                        })

                    }


                })

            }

        })
    } catch (error) {
        throw new Error("Internal Server Error")

    }

}


const authUser = async (req, res) => {
    const { email, password } = req.body
    const Hashedpassword = crypto.createHash('sha256').update(password).digest('base64')
    db.query("SELECT * FROM users WHERE email =?", [email], (err, result) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        }
        if (result.length === 1) {
            //console.log(result[0].password+"|"+Hashedpassword)
            if (result[0].password === Hashedpassword) {
                res.json({
                    _id: result[0].id,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    phone: result[0].phone,
                    Street: result[0].Street,
                    City: result[0].City,
                    State: result[0].State,
                    Country: result[0].Country,
                    ZipCoce: result[0].ZipCode,
                    image:result[0].photo_path,
                    token: generateToken(result[0].id),

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

const getUserProfile = async (req, res) => {
    if (req.userAuth) {
        db.query("SELECT * FROM users WHERE id =?", [req.userId], (err, result) => {
            if (err) {
                throw new Error(err)
            }
            if (result.length === 1) {
                //console.log(result[0])
                res.json({
                    _id: result[0].id,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    phone: result[0].phone,
                    Street: result[0].street,
                    City: result[0].city,
                    State: result[0].state,
                    Country: result[0].country,
                    ZipCode: result[0].zipcode,
                    image:result[0].photo_path

                })
            }
            else {
                res.status(401)
                throw new Error("Error 401 - Not Authorized")
            }
        })
    }


}

const addFavourite = async (req, res) => {
    if (req.userAuth) {

        db.query("SELECT DISTINCT rest_id FROM `favourites` WHERE cust_id = ?", [req.params.cust_id], (err, result) => {
            if(result.find(x=>x.rest_id = req.params.rest_id))
                console.log("sdasd")

        let sql = "INSERT INTO `favourites` (`cust_id`, `rest_id`) VALUES (?, ?);"
        db.query(sql, [req.params.cust_id,req.params.rest_id], (err, result) => {
            if (err) {
                res.status(500).json({
                    "message":"Internal Server Error"
                })
            }
            else {
                //console.log(result[0])
                res.status(200).json({
                    "message":"success"

                })
            }
            
        })
    })
    }
    else {
        res.status(401)
        throw new Error("Error 401 - Not Authorized")
    }


}


const getUserFavourites = async (req, res) => {
    if (req.userAuth) {
        let sql = "SELECT * FROM `favourites` WHERE cust_id = ?;"
        db.query(sql, [req.params.cust_id], (err, result) => {
            if (err) {
                res.status(500).json({
                    "message":"Internal Server Error"
                })
            }
            else {
                //console.log(result[0])
                res.status(200).json({
                    result

                })
            }
            
        })
    }
    else {
        res.status(401)
        throw new Error("Error 401 - Not Authorized")
    }


}

const removeFavourites = async (req, res) => {
    if (req.userAuth) {
        let sql = "DELETE  FROM `favourites` WHERE cust_id = ?;"
        db.query(sql, [req.params.cust_id], (err, result) => {
            if (err) {
                res.status(500).json({
                    "message":"Internal Server Error"
                })
            }
            else {
                //console.log(result[0])
                res.status(200).json({
                    "message":"success"

                })
            }
            
        })
    }
    else {
        res.status(401)
        throw new Error("Error 401 - Not Authorized")
    }


}

const updateUserProfile = async (req, res) => {


    if (req.userAuth) {

        db.query("SELECT * FROM users WHERE id =?", [req.userId], (err, result) => {
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

module.exports = { addUser, authUser, getUserFavourites,addFavourite,getUserProfile, updateUserProfile,removeFavourites }