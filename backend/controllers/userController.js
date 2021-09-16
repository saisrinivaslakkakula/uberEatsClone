const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const addUser = async(req,res)=>{
    const{firstName,lastName,email,phone,password,Street,City,State,Country,ZipCode} = req.body
    //console.log(req.body)
    let id = crypto.createHash('sha256').update(email+firstName).digest('base64')
    let sql = "INSERT INTO `users` (`id`,`firstName`, `lastName`, `email`, `password`, `phone`, `street`, `city`, `state`,`country`,`zipcode`) VALUES ('"+id+"', '"+firstName+"', '"+lastName+"','"+email+"','"+password+"','"+phone+"','"+Street+"','"+City+"','"+State+"','"+Country+"','"+ZipCode+"' ) "
    //console.log(sql)
    try { 

        db.query("SELECT * FROM users WHERE email =?",[email], (err,result)=>{
            if(err){
                res.status(500).json({
                    message:" Internal Server Error"
                })
            }

            if(result.length !==0){
                res.status(401).json({
                    message:" User Already Exists!"
                })
            }
            else{
                db.query(sql,(err,result)=>{
                    if(err){
                        res.status(500).json({
                            message:" Internal Server Error"
                        })
                    }
                    res.status(201).json({
                        firstName:firstName,
                        lastName:lastName,
                        email:email,
                        phone:phone,
                        Street:Street,
                        City:City,
                        State:State,
                        Country:Country

                    })
            
            })

            }

        })
    } catch (error) {
        throw new Error ("Internal Server Error")
        
    }
        
}


const authUser= async(req,res) =>{
    const {email,password} = req.body 
    //console.log("hi")
    db.query("SELECT * FROM users WHERE email =?",[email], (err,result)=>{
        if(err){
            res.status(400).json({
                message:err
            })
        }
        if(result.length ===1){
            if(result[0].password === password){
                res.json({
                    _id:result[0].id,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    phone:result[0].phone,
                    Street:result[0].Street,
                    City:result[0].City,
                    State:result[0].State,
                    Country:result[0].Country,
                    ZipCoce:result[0].ZipCode,
                    token: generateToken(result[0].id),

                })
            }
            else{
                
                res.status(400).json({
                    message:"Email Id/ Password doesn't match. Please try again."
                })
            }
        }
        else{
            res.status(400).json({
                message:"Email Id/ Password doesn't match. Please try again."
            })
        }
         

    })

}

const getUserProfile= async(req,res) =>{
    if(req.userAuth){
        db.query("SELECT * FROM users WHERE id =?",[req.userId], (err,result)=>{
            if(err){
                throw new Error(err)
            }
            if(result.length ===1){
                    res.json({
                        _id:result[0].id,
                        firstName: result[0].firstName,
                        lastName: result[0].lastName,
                        email: result[0].email,
                        phone:result[0].phone
    
                    })
            }
            else{
                res.status(401)
                throw new Error("Error 401 - Not Authorized")
            }
        })
    }
    

}

module.exports = {addUser,authUser,getUserProfile}