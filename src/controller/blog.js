import Blogmodel from "../model/blog.js";

const createBlog=async(req,res)=>{
    
    try {
        let {title,content}=req.body

        if(title && content){
         
           let newBlog = await Blogmodel.create({
              title,
              content,
              createdBy:req.headers.userId
           })

           res.status(201).json({
             message:"New blog created sucessfully",
             newBlog
           })

       }else{
        res.status(400).json({
            message:'All data field  is required'
        })
       } 

    } catch (error) {
        console.log(error)
    }
   

}

const getBlogByUser =async(req,res)=>{
    try {
        let blogs= await Blogmodel.find({createdBy:req.headers.userId})
        
        res.status(200).json({
             message:"All User Blogs fetched sucessfully",
             blogs
        })

    } catch (error) {
        console.log(error)
    }
}

const getBlogById=async(req,res)=>{
    try {
        
        let blogId=req.params.id;

       let blog=await Blogmodel.findById({_id:blogId})

       res.status(200).json({
         message:"blog fetched sucessfully",
         blog
       })

    } catch (error) {
        console.log(error)
    }
}

const editBlog=async(req,res)=>{
 try {
     let blogId=req.params.id;
     let blog=await Blogmodel.findById({_id:blogId})
      
     if(blog){

          let {title,content}=req.body

           blog.title=title
           blog.content=content
           
           blog.modifiedAt= Date.now()
           await blog.save()

           res.status(200).json({
            message:"Blog edited sucessfully",
            blog
           })

     }else{
        res.status(400).send({
            message:"Blog not found"
        })
     }

 } catch (error) {
     console.log(error)
 }
}

const deleteBlog=async(req,res)=>{

    try {

        let blogId=req.params.id;

        let blog= await Blogmodel.findById({_id:blogId})

        if(blog){
            let deleteBlog = await Blogmodel.deleteOne(blog)

            res.status(200).send({
                message:"Blog deleted sucessfully",
                deleteBlog
            })
        }else{
            res.status(400).send({
                message:"Blog not found",
            })
        }
    } catch (error) {
        console.log(error)
        
    }

}

const likeBlog=async(req,res)=>{
       try {

        let blogId=req.params.id;

        let blog= await Blogmodel.findById({_id:blogId})
         
         if(blog){
            let isLiked= blog.likedBy.includes(req.headers.userId)
             console.log(isLiked)
            
             if(!isLiked){
                 
                    blog.likes += 1
                    // blog.likedBy=[...blog.likedBy , req.headers.userId]
                    blog.likedBy.push(req.headers.userId)

                  await blog.save()
                  res.status(200).send({
                     message:"blog liked",
                     likes:blog.likes
                  })
        

             }else{
              
                    blog.likes -= 1
                    blog.likedBy= blog.likedBy.filter((userId)=>userId  != req.headers.userId)
                     
                    await blog.save()

                    res.status(200).json({
                       message:"blog unliked ",
                       likes:blog.likes
                    })
                }
             
        
         }else{
             res.status(400).json({
                message:"blog not found"
             })
         }

       } catch (error) {
        console.log(error)
       }
}














export default{
    createBlog,
    getBlogByUser,
    getBlogById,
    editBlog,
    deleteBlog,
    likeBlog
}