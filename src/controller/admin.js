import Blogmodel from "../model/blog.js";
import Usermodel from "../model/user.js";
import Commentsmodel from "../model/comment.js";
import Tagsmodel from '../model/tag.js'

const getAllBlogs=async(req,res)=>{
  try {
      let allBlogs= await Blogmodel.find({}).populate('tags','name').populate('comments','text')

      res.status(200).send({
        message:"All blog fetched sucessfully",
        allBlogs
      })
  } catch (error) {
    
    console.log(error)
  }
}

const getAllUsers=async(req,res)=>{
    try {
        
       let allusers= await Usermodel.find()
       res.status(200).send({
         message:"All user Fetched sucessfully",
         allusers
       })
    } catch (error) {
        console.log(error)
    }
}

const getBlogById=async(req,res)=>{
    try {
        
        let blogId=req.params.id;

       let blog=await Blogmodel.findById({_id:blogId}).populate('tags').populate('comments')

       res.status(200).json({
         message:"blog fetched sucessfully",
         blog
       })

    } catch (error) {
        console.log(error)
    }
}

const deleteComments=async(req,res)=>{
    try {
         let commentId=req.params.id
         let blogId= req.params.blogid
        if( commentId && blogId){
          
         let comment = await Commentsmodel.findById(commentId)
         if (!comment) {
             return res.status(404).send({ message: "Comment not found" });
         }
 
         let blog = await Blogmodel.findById(blogId)
         if (!blog) {
             return res.status(404).send({ message: "Blog not found" });
           }
 
         blog.comments =blog.comments.filter((comment)=>comment._id != commentId )
 
         await blog.save()
 
         let deletecomment =await Commentsmodel.deleteOne({_id:commentId})
 
         res.status(200).send({
             message:"comment deleted sucessfully",
             deletecomment
         })
 
        }else{
           res.status(400).json({
              message:"comment id and blogid required"
           })
        }
 
    } catch (error) {
      console.log(error)
    }
 }

 const getBlogsByTag=async(req,res)=>{
    try {
      let tagname=req.params.tagname;

        let tag= await Tagsmodel.find({name:tagname}).populate('blog')

        if (!tag) {
          return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json({
          message:"All Blog By tag fetched sucessfully",
          tag
        })
    } catch (error) {
      console.log(error)
    }
}

export default{
    getAllBlogs,
    getAllUsers,
    getBlogById,
    deleteComments,
    getBlogsByTag

}
