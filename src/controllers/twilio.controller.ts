import twilio from 'twilio'
import { Request, Response } from 'express'
import { catchError } from "../utils/error"


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)


export const getTurnServer = async (req: Request, res: Response) => {
    try {
        const { iceServers } = await client.tokens.create()
        res.json(iceServers)
    } catch (error) {
        catchError(error, res, "failed to generate turn server")
    }
}