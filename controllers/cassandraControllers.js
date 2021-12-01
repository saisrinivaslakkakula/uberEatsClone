const client = require('../dbconfig')
const cassandraCreate = async (req, res) => {

  let cql = `INSERT INTO sample.user (userId, username) VALUES (uuid(), '${req.body.name}')`
  client.execute(cql,(err,result)=>{
    if (err){
      res.status(500).json({
        "message":"500 Internal Server Error",
        "error":err
      })
      
    }
    else{
      res.status(200).json({
        "result":"User Created Success"
      })
    }
    
  })
  
}

const cassandraRead = async (req, res) => {

  let cql = "SELECT * FROM sample.user "
  client.execute(cql,(err,result)=>{
    if (err){
      res.status(500).json({
        "message":"500 Internal Server Error",
        "error":err
      })
      
    }
    else{
      res.status(200).json({
        "result":result.rows
      })
    }
    
  })
  
}

const cassandraUpdate = async(req, res) => {

  const { userId, username } = req.body

  let cql = `UPDATE sample.user SET username='${username}' WHERE userId=${userId} IF EXISTS`;

  client.execute(cql,(err,result)=>{
    if (err){
      res.status(500).json({
        "message":"500 Internal Server Error",
        "error":err
      })

    }
    else{
      res.status(203).json({
        "result": "User Updated Successfully"
      })
    }

  })
}

const cassandraDelete = async(req, res) => {


  let cql = `DELETE FROM sample.user WHERE userId=${req.params.id}`;

  client.execute(cql,(err,result)=>{
    if (err){
      res.status(500).json({
        "message":"500 Internal Server Error",
        "error":err
      })

    }
    else{
      res.status(203).json({
        "result": "User Deleted Successfully"
      })
    }

  })

}

module.exports = {cassandraCreate,cassandraRead, cassandraUpdate, cassandraDelete }