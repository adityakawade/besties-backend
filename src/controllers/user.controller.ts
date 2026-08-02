import { Request, Response } from "express";
import authModel from "../models/auth.models";
import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { catchError, tryError } from "../utils/error";


const accessTokenExpiry = '10m';
const refreshTokenExpiry = '';



export interface payloadInterface {
    _id: Types.ObjectId;
    email: string;
    fullname: string;
    mobile: string
}


const generateToken = (payload: payloadInterface) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: accessTokenExpiry });
    return accessToken;
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

        const payload = { _id: user._id, email: user.email, fullname: user.fullname, mobile: user.mobile };

        const options = {
            httpOnly: true,
            maxAge: (10 * 60) * 1000,
            secure: false,
            domain: 'localhost'
        }

        const accessToken = generateToken(payload);

        res.cookie('accessToken', accessToken, options);

        res.json({ message: "login success" });

    }

    catch (error: unknown) {

        catchError(error, res, "Login Failed please try after some time");

    }
}


export const forgotPassword = (req: Request, res: Response) => {
    res.send("hello signup");
}



export const getSession = async(req: Request, res: Response) => {
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
