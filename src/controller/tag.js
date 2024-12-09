import Tagsmodel from '../model/tag.js'
import Blogmodel from "../model/blog.js";


 const createTag = async (req, res) => {
    try {
        
        let blogId=req.params.blogid;

        let blog = await Blogmodel.findOne({_id:blogId})
        if(!blog){
            return res.status(404).json({
                message:"blog is not found"
            })
        }
        let {name}= req.body
        let tag= await Tagsmodel.findOne({name})
        if(!tag){
            tag = new Tagsmodel({
                name,
                blog:[blogId]
            })
        }else{
             if(!tag.blog.includes(blogId)){
                tag.blog.push(blogId)
             }
        }

        await tag.save();
    
        if (!blog.tags.includes(tag._id)) {
        blog.tags.push(tag._id);
        await blog.save();
        }
        res.status(201).json({
            message: "Tag created and associated with the blog successfully",
            tag,
          });
    } catch (error) {
        console.log(error)
    }
  };
  
 const getTags = async (req, res) => {
      try {
          let allTags = await Tagsmodel.find()
           res.status(200).send({
            message:"All tags fetched sucessfully",
            allTags
           })
      } catch (error) {
         console.log(error)
      }
  };
  
  
 const removeTagFromBlog = async (req, res) => {
    try {
    
       let blogId=req.params.blogid;
       let tagId=req.params.tagid;
       
       let blog = await Blogmodel.findById({_id:blogId})

       if(!blog){
          return res.status(404).json({
            message:"blog not found"
          })
       }

       let tag = await Tagsmodel.findById({_id:tagId})

       if(!tag){
        return res.status(404).json({
            message:"Tag not found"
          })
       }


       blog.tags= blog.tags.filter((id)=>id != tagId)

       await blog.save()

       tag.blog=tag.blog.filter((id)=>id != blogId)

       await tag.save()

       res.status(200).json({
         message:"Tag successfully removed from the blog"
       })

    } catch (error) {
        console.log(error)
    }
  };


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
    createTag,
    getTags,
    removeTagFromBlog,
    getBlogsByTag
  }