const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()

//console.log("Fired!")
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

    
})


function checkFileType(file,cb){
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Images Only!')
    }
}
const upload = multer({
    storage,
    fileFilter:function(req,file,cb){
        //console.log("Called")
        checkFileType(file,cb)
    }

})

router.post('/userimage',upload.single('user_image'),(req,res)=>{
    //console.log(req.file.path)
    res.send(`/${req.file.path}`)
})

module.exports = router 