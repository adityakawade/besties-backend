import { Request, Response } from 'express'
import { catchError, tryError } from '../utils/error'
import { Bucket$, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'


const conn = new S3Client({
    region: process.env.REGION,
    endpoint: `https://s3-${process.env.REGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

const isFileExist = async (path: string) => {

    try {

        const command = new HeadObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: path
        })

        await conn.send(command);
        return true;
    } catch (error) {

        return false;
    }
}

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

        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: 'adityacv.pdf'
        })

        const url = await getSignedUrl(conn, command, { expiresIn: 60 });
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

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: path,
            ContentType: type
        })

        const url = await getSignedUrl(conn, command, { expiresIn: 60 });

        res.json({ url })



    } catch (error) {

    }
}