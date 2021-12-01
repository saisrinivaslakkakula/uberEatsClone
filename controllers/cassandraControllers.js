const client = require('../dbconfig')
const cassandraCreate = async (req, res) => {
  const {name} = req.body
  let cql = "INSERT INTO sample.test (name)\
  VALUES ('"+name+"')\
  "
  client.execute(cql,(err,result)=>{
    if (err){
      res.status(500).json({
        "message":"500 Internal Server Error",
        "error":err
      })
      
    }
    else{
      res.status(200).json({
        "result":"Success"
      })
    }
    
  })
  
}

const cassandraRead = async (req, res) => {

  let cql = "SELECT * FROM sample.test "
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

  const { id, username } = req.body

  let cql = "UPDATE sample.test SET name='"+username+"' WHERE _id='"+id+"' IF EXISTS";

  client.execute(cql,(err,result)=>{
    if (err){
      res.status(500).json({
        "message":"500 Internal Server Error",
        "error":err
      })

    }
    else{
      res.status(203).json({
        "result":result.rows
      })
    }

  })
}

module.exports = {cassandraCreate,cassandraRead, cassandraUpdate}