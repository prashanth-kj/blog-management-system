import express from 'express'
import Auth from '../common/auth.js'
import commentController from '../controller/comment.js'
 
const router = express.Router()

router.post('/:blogid/create',Auth.validate,commentController.createComment)
router.get('/:blogid',Auth.validate ,commentController.getComments)
router.delete('/:blogid/delete/:id',Auth.validate ,commentController.deleteComments)

export default router 