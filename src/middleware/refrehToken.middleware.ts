
import { NextFunction, Request, Response } from "express"
import { catchError, tryError } from "../utils/error"
import moment from "moment";
import authModel from "../models/auth.models";
import { sessionInterface } from "./auth.middleware";

const RefreshToken = async (req: sessionInterface, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw tryError("failed to refresh token", 401);
        }

        const user = await authModel.findOne(({ refreshToken }))

        if (!user) {
            throw tryError("failed to refresh token", 401);
        }

        const today = moment();
        const expiry = moment(user.expiry)

        const isExpired = today.isAfter(expiry)

        if (isExpired) {
            throw tryError("failed to refresh token ", 401);
        }



        req.session = {
            _id: user._id,
            fullname: user.fullname,
            mobile: user.mobile,
            email: user.email,
            image: user.image
        }


        next()

    } catch (error) {
        catchError(error, res, "failed to refresh token")
    }
}


export default RefreshToken