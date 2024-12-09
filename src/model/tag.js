import mongoose from './index.js'

const tagSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    blog:[{type:mongoose.Schema.Types.ObjectId, ref:'blogs'}]

},{
    collection:'tags',
    versionKey:false
})

const Tagschema= mongoose.model('tags',tagSchema)
export default Tagschema



