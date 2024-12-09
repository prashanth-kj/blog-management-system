import express from 'express'
import tagController from '../controller/tag.js'
import Auth from '../common/auth.js'

const router = express.Router()

router.post('/:blogid/create',Auth.validate,tagController.createTag)
router.get('/alltags',Auth.validate,tagController.getTags)
router.get('/:tagname',Auth.validate,tagController.getBlogsByTag)
router.delete('/:blogid/:tagid',Auth.validate,tagController.removeTagFromBlog);


export default router