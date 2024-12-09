import Usermodel from "../model/user.js";
import Auth from '../common/auth.js'

const createUser=async(req,res)=>{
     
     try {
         let user= await Usermodel.findOne({email:req.body.email})
         if(!user){
             let {name,email,username,password}=req.body

             if(name && email && username && password){

                  if(password.length>2){
                      req.body.password= await Auth.hashPassword(req.body.password)
                      let newUser= await Usermodel.create(req.body)
                      res.status(201).json(({
                        message:"New user created sucessfully",
                        newUser:newUser
                     }))
                  }else{
                      res.status(404).json({
                        message:"password must be min 3 character"
                      })
                  }
                 
             }
             else{
                res.status(404).json({
                    message:"All data field is required"
                })
             }
         }else{
            res.status(404).json(({
                message:`user with ${req.body.email} is already exists`
            }))
         }
     } catch (error) {
         console.log(error)
     }

}


const login =async(req,res)=>{
       
    try {
         
        let user =await Usermodel.findOne({email:req.body.email})
        if(user){
               
             let hashCompare= await Auth.hashCompare(req.body.password,user.password)
              if(hashCompare){

                  let token = await Auth.createToken({
                       id:user._id,
                       name:user.name,
                       email:user.email,
                       username:user.username,
                       role:user.role     
                  })
                
                user = await Usermodel.findOne({email:user.email},{_id:0,email:0,password:0,status:0,createdAt:0})
                res.status(201).json({
                    message:"Login sucessfully",
                    token,
                    user
                  })
              }else{
                res.status(401).send({
                    message:"Password does not match"
                })
              }
              
             
        }else{
            res.status(404).json({
                message:`Account with ${req.body.email} does not exists`
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}



export default {
    createUser,
    login
}