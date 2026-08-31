import { Request, Response } from 'express'
import { catchError, tryError } from '../utils/error'
import FriendModel from '../models/friends.models'
import { sessionInterface } from '../middleware/auth.middleware'
import authModel from '../models/auth.models'
import mongoose from 'mongoose'
import { type } from 'os'
import { Types } from 'mongoose'


export const addFriend = async (req: sessionInterface, res: Response) => {
    try {
        req.body.user = req.session?._id
        console.log(req.body);

        const friend = await FriendModel.create(req.body)
        res.json(friend)
    } catch (error: unknown) {
        catchError(error, res, "Failed to send friend request")
    }
}



export const fetchFriend = async (req: sessionInterface, res: Response) => {
    try {
        const user = req.session?._id;
        const friends = await FriendModel.find({ user }, {}).populate('friend');
        res.json(friends)

    } catch (error: unknown) {
        catchError(error, res, "Failed to send friend request")
    }
}


export const suggestFriend = async (req: sessionInterface, res: Response) => {
    try {

        if (!req.session) {
            throw tryError('Failed to suggest Friend', 401)
        }

        const userId = new mongoose.Types.ObjectId(req.session._id)

        const friends = await authModel.aggregate([
            { $match: { _id: { $ne: userId } } },
            { $sample: { size: 5 } },
            { $project: { fullname: 1, image: 1, createdAt: 1 } }
        ]);


        const modified = await Promise.all(
            friends.map(async (item) => {
                const count = await FriendModel.countDocuments({ friend: item._id })
                return count === 0 ? item : null
            })
        )

        const filterFriends = modified.filter((item) => {
            return item !== null
        })

        res.json(filterFriends)
    } catch (error: unknown) {
        catchError(error, res, "Failed to send friend request")
    }
}

export const deleteFriend = async (req: Request, res: Response) => {
    try {
        await FriendModel.deleteOne({ _id: req.params.id })
        res.json({ message: "Friend Deleted" })
    } catch (error) {
        catchError(error, res, "Failed to delete friend")
    }
}



export const friendRequest = async (req: sessionInterface, res: Response) => {
    try {

        if (!req.session) {
            throw tryError('Failed to fetch Friend request', 401)
        }

        const friends = await FriendModel.find({ friend: req.session?._id, status: "requested" }).populate('user', "fullname image")

        res.json(friends)
    } catch (error: unknown) {
        catchError(error, res, "Failed to fetch friend request")
    }
}




export const updateFriendStatus = async (req: sessionInterface, res: Response) => {
    try {
        if (!req.session) {
            throw tryError('failed to update  friend status', 401)
        }

        await FriendModel.updateOne({ _id: req.params.id }, { $set: { status: req.body.status } })
        res.json({ message: "friend status updated" })
    } catch (error) {
        catchError(error, res, "failed to update  friend status")
    }
}