import { Request, Response } from 'express'
import { catchError } from '../utils/error'
import FriendModel from '../models/friends.models'
import { sessionInterface } from '../middleware/auth.middleware'
import authModel from '../models/auth.models'

export const addFriend = async (req: sessionInterface, res: Response) => {
    try {
        req.body.user = req.session?._id
        console.log(req.body);

        const friend = await FriendModel.create(req.body)
        res.json(friend)
    } catch (error) {
        catchError(error, res, "Failed to send friend request")
    }
}

 

export const fetchFriend = async (req: sessionInterface, res: Response) => {
    try {
        const user = req.session?._id;
        const friends = await FriendModel.find({ user });
        res.json(friends)

    } catch (error) {
        catchError(error, res, "Failed to send friend request")
    }
}


export const suggestFriend = async (req: sessionInterface, res: Response) => {
    try {
        const friends = await authModel.aggregate([
            { $sample: { size: 5 } },
            { $project: { fullname: 1, image: 1 } }
        ]);
       
       res.json(friends)
    } catch (error) {
        catchError(error, res, "Failed to send friend request")
    }
}