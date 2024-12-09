import mongoose from './index.js'


const blogSchema= new mongoose.Schema({
      title:{
        type:String,
        required:['title is required',true]
      },
      content:{
        type:String,
        required:['content is required' , true]
      },
      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
      },
      tags:[{type:mongoose.Schema.Types.ObjectId, ref:'tags'}],
      comments:[{type:mongoose.Schema.Types.ObjectId, ref:'comments'}],
      likes:{
        type:Number,
        default:0
      },
      likedBy:[{type:mongoose.Schema.Types.ObjectId, ref:'users'}],
      createdAt:{
        type:Date,
        default:Date.now() 
      },
      modifiedAt:{
        type:Date
      }

},{
    collection:'blogs',
    versionKey:false
})

const Blogmodel= mongoose.model('blogs',blogSchema)

export default Blogmodel