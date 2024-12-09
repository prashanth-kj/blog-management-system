import express from 'express'
import userRoutes from './user.js'
import blogRoutes from './blog.js'
import commentRoutes from './comment.js'
import tagRoutes from './tag.js'
import adminRoutes from './admin.js'
const router= express.Router()

router.use('/user', userRoutes)
router.use('/blog',blogRoutes)
router.use('/comment',commentRoutes)
router.use('/tag', tagRoutes)
router.use('/admin', adminRoutes)

export default router