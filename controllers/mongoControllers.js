
/* 
@ POST
/api/users/read
User Signup Route
 */
const User = require('../Models/UserModel')
const readUser = async (req,res)=>{
     // get the data from request body which is in json and put it in variables called user and password
    const results = await User.find()

       console.log("Came to Controller!")
 
        if(results){
           
         res.status(201).json(
             {
              "results":results
            
             }
         )
     }
     else{
         res.status("400")
         throw new Error ("400 Bad Request: Please try again later. ")
     }
     
 
     
    
 }

 const createUser = async (req,res)=>{
    // get the data from request body which is in json and put it in variables called user and password
   const results = await User.create({
       name:req.body.name
   })

     

       if(results){
          
        res.status(201).json(
            {
             "results":results
           
            }
        )
    }
    else{
        res.status("400")
        throw new Error ("400 Bad Request: Please try again later. ")
    }
    

    
   
}

 module.exports = {readUser,createUser}