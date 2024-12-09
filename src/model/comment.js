import mongoose from './index.js'


const commentSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogs'
    },
    text:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now()}
},{
    collection:'comments',
    versionKey:false
})

const Commentsmodel = mongoose.model('comments', commentSchema)

export default Commentsmodel