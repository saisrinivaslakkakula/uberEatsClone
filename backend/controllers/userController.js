const crypto = require('crypto')
const generateToken = require('../utils/generateToken')
const db = require('../dbCon')
const addUser = async(req,res)=>{
    const{firstName,lastName,email,phone,password} = req.body
    let id = crypto.createHash('sha256').update(email+firstName).digest('base64')
    let sql = "INSERT INTO `users` (`id`,`firstName`, `lastName`, `email`, `password`, `phone`) VALUES ('"+id+"', '"+firstName+"', '"+lastName+"','"+email+"','"+password+"',"+phone+" ) "
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
                        name:firstName,
                        email:email
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
    db.query("SELECT * FROM users WHERE email =?",[email], (err,result)=>{
        if(err){
            throw new Error(err)
        }
        if(result.length ===1){
            if(result[0].password === password){
                res.json({
                    _id:result[0].id,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    token: generateToken(result[0].id),

                })
            }
            else{
                res.send("Email or password doesn't match!")
            }
        }
        else{
            res.send(" Email or password doesn't match!")
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