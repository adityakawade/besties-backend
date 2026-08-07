import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const conn = new S3Client({
    region: process.env.REGION,
    endpoint: `https://s3-${process.env.REGION}.amazonaws.com`

})

export const isFileExist = async (path: string) => {

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

export const downloadObject = async (path: string, expiry: number = 60) => {


    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: path
    })

    const url = await getSignedUrl(conn, command, { expiresIn: expiry });

    return url;
}


export const uploadObject = async (path: string, type: string, expiry: number = 60) => {


    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: path,
        ContentType: type
    });

    const url = await getSignedUrl(conn, command, { expiresIn: expiry });

    return url;
}