import { Request, Response } from "express";
import authModel from "../models/auth.models";
import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const accessTokenExpiry = '10m';
const refreshTokenExpiry = '';

interface ErrorMessage extends Error {
    status?: number;
}

interface payloadInterface {
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

        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }

    }
}



export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const user = await authModel.findOne({ email: email });

        if (!user) {
            const err: ErrorMessage = new Error("User not found , please try to signup first");
            err.status = 404;
            throw err
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            const err: ErrorMessage = new Error("Invalid credentials");
            err.status = 401;
            throw err;
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

        if (error instanceof Error) {
            const status = (error as ErrorMessage).status || 500
            res.status(status).json({ message: error.message });
        }

    }
}


export const forgotPassword = (req: Request, res: Response) => {
    res.send("hello signup");
}
