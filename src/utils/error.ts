import { Response } from "express";
import { error } from "node:console";

export interface ErrorMessage extends Error {
    status?: number;
}


export const tryError = (message: string, status: number = 500) => {
    const err: ErrorMessage = new Error(message)
    err.status = status
    return err
}

export const catchError = (error: unknown, res: Response, prodMessage: string = "Internal Server Error") => {
    if (error instanceof Error) {
        const message = (process.env.NODE_ENV === "dev" ? error.message : prodMessage)
        const status = (error as ErrorMessage).status || 500;
        res.status(status).json({ message });
    }

}