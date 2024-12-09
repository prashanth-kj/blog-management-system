import Commentsmodel from "../model/comment.js";
import Blogmodel from "../model/blog.js";

const createComment=async(req,res)=>{
      try {
        let userId=req.headers.userId;
        let blogId=req.params.blogid;
          
        let {text}= req.body
         let comment = new Commentsmodel({
             user:userId,
             blog:blogId,
             text:text
         })
          
         await comment.save()
 

         let  blog= await Blogmodel.findById(blogId)  
         blog.comments.push(comment._id)

         await blog.save()


         res.status(201).send({
            message:"comment created Sucesfully",
            comment,
            blog
         })

      } catch (error) {
        console.log(error)
      }
}


const getComments=async(req,res)=>{
     try {
         
         let comments= await Commentsmodel.find()

         res.status(200).json({
              message:"All comments fetched sucessfully",
              comments
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


export default {
    createComment,
    getComments,
    deleteComments
}


