/*const JwtStrategy   =require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;*/
const passport = require('passport');
var User          =require('../Models/userModel');
const ayncHandler = require('express-async-handler')
const db = require('../dbCon')
const jwt = require('jsonwebtoken')
const protect = ayncHandler(async(req,res,next) =>{
    
    let token = null
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        try {
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)
            if(decoded.id){
                req.userAuth = true
                req.userId = decoded.id
            }
            else{
                req.userAuth = false
                req.userId = decoded.id
            }
            
            next()
        } catch (error) {
            throw new Error(error)
        }
    }
    
    if(!token){
        res.status(401)
        throw new Error("Unauthorized Access!")
    }
})

module.exports = protect




/*passport.authenticate('jwt',{session:false}),async (request,result)=>{
        if(request.user){
            console.log(request)
            result.authStatus = true
            req.authStatus = true
            res.authStatus = true
        }
        else{
            result.authStatus = false
            req.authStatus = false
            res.authStatus = false
        }
        
    }*/



        