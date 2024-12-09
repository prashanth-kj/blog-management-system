import express from 'express'
import blogController from '../controller/blog.js'
import Auth from '../common/auth.js'


const router= express.Router()

router.post('/create',Auth.validate,blogController.createBlog)
router.get('/user',Auth.validate,blogController.getBlogByUser)
router.get('/:id', Auth.validate,blogController.getBlogById)
router.put('/edit/:id', Auth.validate,blogController.editBlog)
router.delete('/delete/:id', Auth.validate,blogController.deleteBlog)
router.post('/:id/like',Auth.validate,blogController.likeBlog)


export default router