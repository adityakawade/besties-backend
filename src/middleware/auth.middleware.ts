import { NextFunction, Request, Response } from 'express'
import { catchError, tryError } from '../utils/error';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { Types } from 'mongoose';


export interface payloadInterface {
    _id: Types.ObjectId;
    email: string;
    fullname: string;
    mobile: string;
    image?: string | null
}

export interface sessionInterface extends Request {
    session?: payloadInterface
}

const Authmiddleware = (req: sessionInterface, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.cookies.accessToken

        if (!accessToken) {
            throw tryError("Unauthorized ", 401)
        }

        const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;



        req.session = {
            _id: payload._id,
            fullname: payload.fullname,
            mobile: payload.mobile,
            email: payload.email,
            image: payload.image
        }



        next();


    } catch (error) {
        catchError(error, res, "Unauthorized");

    }
}

export default Authmiddleware