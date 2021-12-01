
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
       name: req.body.name
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

const updateUser = async(req, res) => {

    try{
        const user = await User.findById({_id: req.body.id})
        if(user){
            user.set({
                name: req.body.username
            })

            await user.save();

            res.status(203).send(user);
        }
        else{
            res.status(400).send("Unable to find the user");
        }
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
}

const deleteUser = async(req, res) => {
    try{
        const user = await User.findById({_id: req.params.id})
        if(user){
            await User.deleteOne({_id: req.params.id})

            res.status(200).send("User deleted successfully");
        }
        else{
            res.status(400).send("Unable to find the user");
        }
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
}

 module.exports = {readUser,createUser, updateUser, deleteUser}