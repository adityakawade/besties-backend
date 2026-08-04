import { Request, Response } from 'express'
import { catchError, tryError } from '../utils/error'
import { Bucket$, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { downloadObject, isFileExist, uploadObject } from '../utils/s3'







export const downloadFile = async (req: Request, res: Response) => {
    try {
        const path = req.body?.path;

        if (!path) {
            throw tryError("failed to generate download url because path is missing", 400);
        }

        const isExist = await isFileExist(path);

        if (!isExist) {
            throw tryError("file not exist", 404);
        }


        const url = await downloadObject(path, 60);
        res.json({ url });

    } catch (error) {

        catchError(error, res, "failed to generate download url")
    }
}


export const uploadFile = async (req: Request, res: Response) => {
    try {

        const path = req.body?.path;
        const type = req.body?.type;

        if (!path || !type) {
            throw tryError("Invalid req path or type is required", 400)
        }



        const url = await uploadObject(path, type);

        res.json({ url })



    } catch (error) {

    }
}