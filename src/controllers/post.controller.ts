import { Response } from 'express'
import { catchError } from '../utils/error'
import postModel from '../models/post.model'
import { sessionInterface } from "../middleware/auth.middleware";


export const createPost = async (req: sessionInterface, res: Response) => {
    try {
        req.body.user = req.session?._id
        const post = await postModel.create(req.body)
        res.json(post)
    } catch (error) {
        catchError(error, res, "failed to create post")
    }
}



export const fetchPost = async (req: sessionInterface, res: Response) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 })
        res.json(posts)
    } catch (error) {
        catchError(error, res, "failed to fetch post")
    }
}