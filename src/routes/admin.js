import express from 'express'
import Auth from '../common/auth.js'
import adminController from '../controller/admin.js'

const router = express.Router()


router.get('/blogs',Auth.validate,Auth.adminGuard,adminController.getAllBlogs )
router.get('/users',Auth.validate,Auth.adminGuard,adminController.getAllUsers )
router.get('/blog/:id',Auth.validate,Auth.adminGuard,adminController.getBlogById)
router.get('/:tagname',Auth.validate,Auth.adminGuard,adminController.getBlogsByTag)
router.delete('/blog/:blogid/delete/:id',Auth.validate,Auth.adminGuard,adminController.deleteComments)


export default router