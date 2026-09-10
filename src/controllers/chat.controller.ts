import mongoose from "mongoose"
import chatModel from "../models/chat.model"
import { catchError, tryError } from "../utils/error"
import { Request, Response } from 'express'
import { sessionInterface } from "../middleware/auth.middleware"
import { log } from "console"
import { downloadObject } from "../utils/s3"

interface payloadInterface {
    from: string,
    to: string,
    message: string,
    file?: {
        path: string,
        type: string
    }
}
export const createChat = (payload: payloadInterface) => {
    chatModel.create(payload)
        .catch((error) => {
            console.log(error.message);
        })
}


export const fetchChats = async (req: sessionInterface, res: Response) => {
    try {

        if (!req.session) {
            throw tryError("failed to fetch chats")
        }



        const chats = await chatModel.find({
            $or: [
                { from: req.session._id, to: req.params.to },
                { from: req.params.to, to: req.session._id }
            ]
        })
            .populate("from", "fullname email mobile image")
            .lean()


        const modifiedChat = await Promise.all(
            chats.map(async (item) => {
                if (item.file) {
                    return {
                        ...item,
                        file: {
                            path: item.file.path && await downloadObject(item.file.path),
                            type: item.file.type
                        }
                    }
                }
                else {
                    return item
                }
            })
        )
        res.json(modifiedChat)
    } catch (error) {
        catchError(error, res, "failed to fetch chats")
    }
}

