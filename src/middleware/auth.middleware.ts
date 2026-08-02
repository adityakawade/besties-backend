import { NextFunction, Request, Response } from 'express'
import { catchError, tryError } from '../utils/error';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { payloadInterface } from '../controllers/user.controller';

export interface sessionInterface extends Request {
    session?: payloadInterface
}

const Authmiddleware = (req: sessionInterface, res: Response, next: NextFunction) => {
    try {
        console.log("welcome to middleware");
        const accessToken = req.cookies.accessToken

        if (!accessToken) {
            throw tryError("Unauthorized ", 401)
        }

        const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
        console.log(payload);


        req.session = {
            _id: payload._id,
            fullname: payload.fullname,
            mobile: payload.mobile,
            email: payload.email
        }



        next();


    } catch (error) {
        catchError(error, res, "Unauthorized");

    }
}

export default Authmiddleware