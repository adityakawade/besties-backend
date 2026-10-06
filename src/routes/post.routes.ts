import { Router } from 'express'
import { createPost, fetchPost } from '../controllers/post.controller'

const postRouter = Router()

postRouter.post("/", createPost)
postRouter.get("/",fetchPost)

export default postRouter