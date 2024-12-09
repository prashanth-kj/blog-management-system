import mongoose from './index.js'


const userSchema= new mongoose.Schema({
      name:{
        type:String,
        required:['name is required', true]
      },
      email:{
        type:String,
        required:['email is required',true],
        unique:true
      },
      username:{
        type:String,
        required:['username is required',true],
        unique:true
      },
      password:{
        type:String,
        required:['password is required', true],
        min:3
      },
      role:{
        type:String,
        default:'user'
      },
      status:{
        type:Boolean,
        default:false
      },
      createdAt:{
        type:Date,
        default:Date.now()
      }
      
},{
    collection:'users',
    versionKey:false
})


const  Usermodel= mongoose.model('users',userSchema)

export default Usermodel