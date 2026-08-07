import { Request, Response } from "express";
import authModel from "../models/auth.models";
import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { catchError, tryError } from "../utils/error";
import { payloadInterface, sessionInterface } from "../middleware/auth.middleware";
import { downloadObject } from "../utils/s3";
import { v4 as uuid } from 'uuid'
import moment from 'moment';


const accessTokenExpiry = '10m';
const tenMinutesInMs = (10 * 60) * 1000;
const sevenDaysInMs = (7 * 24 * 60 * 60) * 1000
type tokenType = 'at' | 'rt'



const generateToken = (payload: payloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: accessTokenExpiry });
    const refreshToken = uuid();
    return { accessToken, refreshToken };
}


const getOption = (tokenType: any) => {
    return {
        httpOnly: true,
        maxAge: tokenType == 'at' ? tenMinutesInMs : sevenDaysInMs,
        secure: false,
        domain: 'localhost'
    }
}



export const signup = async (req: Request, res: Response) => {

    try {

        await authModel.create(req.body);
        res.json({ message: "signup successful" });
    }

    catch (error: unknown) {

        catchError(error, res);

    }
}



export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const user = await authModel.findOne({ email: email });

        if (!user) {
            throw tryError("User not found , please try to signup first", 404);

        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            throw tryError("Invalid credentials", 401);
        }


        const payload = {
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            mobile: user.mobile,
            image: user.image ? await downloadObject(user.image) : null
        };



        const { accessToken, refreshToken } = generateToken(payload);

        await authModel.updateOne({ _id: user._id }, {
            $set: {
                refreshToken: refreshToken,
                expiry: moment().add(7, "days").toDate()

            }
        })

        res.cookie('accessToken', accessToken, getOption('at'));
        res.cookie('refreshToken', refreshToken, getOption('rt'));

        res.json({ message: "login success" });

    }

    catch (error: unknown) {

        catchError(error, res, "Login Failed please try after some time");

    }
}


export const refreshToken = async (req: sessionInterface, res: Response) => {
    try {
        if (!req.session) {
            throw tryError("failed to refersh token", 401);
        }


        req.session.image = (req.session.image ? await downloadObject(req.session.image) : null)

        const { accessToken, refreshToken } = generateToken(req.session);
        await authModel.updateOne({ _id: req.session._id }, {
            $set: {
                refreshToken: refreshToken,
                expiry: moment().add(7, "days").toDate()
            }
        })


        res.cookie('accessToken', accessToken, getOption('at'));
        res.cookie('refreshToken', refreshToken, getOption('rt'));

        res.json({ message: "Token refresh" });


    } catch (error) {
        catchError(error, res, "failed to refersh token")
    }
}



export const getSession = async (req: Request, res: Response) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw tryError("Invalid session", 401);
        }
        const session = await jwt.verify(accessToken, process.env.JWT_SECRET!)
        res.send(session);
    } catch (error) {
        catchError(error, res, "Invalid session");
    }
}



export const updateProfilePicture = async (req: sessionInterface, res: Response) => {
    try {
        const path = req.body?.path;

        if (!path || !req.session) {
            throw tryError("Failed to update ptofile picture")
        }

        const user = await authModel.updateOne({ _id: req.session._id }, { $set: { image: path } });

        const url = await downloadObject(path, 60);


        res.json({ image: url })

    } catch (error) {
        catchError(error, res, "failed to update profile picture")
    }
}