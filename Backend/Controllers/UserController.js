const userSchema = require("../Models/UserModels.js")
const multer  = require('multer')
const flag = true;
// file  uploads 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Images');
    },
    filename: function (req, file, cb) {
      const name = Date.now()+"_"+file.originalname
      cb(null,name);
    }
  })
  exports.upload = multer({ storage: storage })
// create single user 
exports.createSingleUser = async(req,res)=>
{
    
    const user = await userSchema.findOne({email : req.body.email});
    try 
    {
       if(!user) 
       {
         
          const {name,email,number} = req.body;
          const newUser = new userSchema
          (
            {
                name,
                email,
                number,
                image : req.file.filename
            }
          )
          await newUser.save();
          res.status(201).send 
          (
            {
                success : true,
                message : "create single user successfully",
                status : 201,
                data : newUser
            }
          )
       }
       else 
       {
            res.status(500).send 
            (
                {
                    success : false,
                    message : "this user already exist",
                    status : 500,
                    data : req.body.email
                }
            )
       }
    } 
    catch (error) 
    {
        res.status(500).send 
            (
                {
                    success : false,
                    message : error.message,
                    status : 500,
                    data : req.body.email
                }
            )
    }
}

// get all users 
exports.getAllUsers = async(req,res)=>
{
  const users = await userSchema.find().select({_id:0});
  try
  {
     if(users)
     {
       res.status(200).send 
       (
          {
             success : true,
             message : "find the all user successfully",
             status : 200,
             data : users
          }
       )
     }
     else 
     {
        res.status(500).send 
        (
            {
              success : false,
              message : "Empty",
              status : 500,
              data : users
            }
        )
     }
  } 
  catch (error) 
  {
    res.status(500).send 
       (
          {
             success : false,
             message : error.message,
             status : 500,
             data : users
          }
       )
  }
}


// get single user 
exports.getSingleUser = async(req,res)=>
{
    const user = await userSchema.findOne({email : req.params.email})
    try 
    {
      if(user)
      {
        res.status(200).send 
        (
          {
            success : true,
            message : "find single user successfully",
            status : 200,
            data : user
          }
        )
      }
      else 
      {
        res.status(500).send 
        (
          {
            success : false,
            message : "Sorry!! User not found",
            status : 500,
            email : req.params.email
          }
        )
      }
    } 
    catch (error) 
    {
      res.status(500).send 
        (
          {
            success : false,
            message : error.message,
            status : 500,
            data : " "
          }
        )
    }
}

// update user info
exports.updateSingleUser = async(req,res)=>
{
  const user = await userSchema.findOne({email: req.params.email});
  try 
  {      const user = await userSchema.findOne({email:req.params.email});
         const updateUser = await userSchema.findOneAndUpdate
         (
          {email: req.params.email},
          {
            $set:
            {
              name : req.body.name,
              number : req.body.number,
              image : req.file ? req.file.filename : user.image
            }
          },{new:true}
         )

         if(updateUser)
         {
          res.status(200).send 
          (
            {
              success : true,
              message : "update single user successfully",
              status: 200,
              data: updateUser
            }
          )
         }
         else 
        {
         res.status(500).send 
         (
          {
            success : true,
            message : "user not found",
            status: 500,
            data : user
          }
         )
    }}
  
  catch (error) 
  {
    res.status(500).send 
    (
      {
        success : false,
        message : error.message,
        status: 500,
        data : ""
      }
    )
  }
   
} 

// delete single user 
exports.deleteSingleUser = async(req,res)=>
{
   const user = await userSchema.findOneAndDelete({email: req.params.email})
  try 
  {
    if(user)
    {
      res.status(200).send 
      (
        {
          success : true,
          message : "remove user successfully",
          status : 200,
          data : user
        }
      )
    }
    else 
    {
      res.status(500).send 
      (
        {
          success : false,
          message : "user not found",
          status : 500,
          data : req.params.email
        }
      )
    }
  } 
  catch (error) 
  {
    res.status(500).send 
    (
      {
        success : false,
        message : error.message,
        status : 500,
        data : user
      }
    )
  }
}
