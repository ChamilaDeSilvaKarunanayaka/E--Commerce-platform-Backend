import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    password : hashedPassword,
    role : req.body.role
  })

  user.save().then(()=>{
    res.json({
      message : "user created successfully"
    })
  }).catch(()=>{
    res.json({
      message : "error creating user"
    })
  })
}

export function loginUser(req,res){
  const email = req.body.email
  const password = req.body.password

  User.findOne({email : email}).then(
    (user)=>{
      if(user == null){
        res.status(404).json({
          message : "user not found"
        })
      
      }else{
        const isPasswordValid = bcrypt.compareSync(password, user.password)

        if(isPasswordValid){
          const token = jwt.sign({
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            role : user.role,
            img : user.img
        }, "dilcsksecretkey")

          res.json({
            message : "login successful",
            token : token
          }) 

        }else{
          res.status(401).json({
            message : "invalid password"
          })
        } 
      }
    }
  )
    
}