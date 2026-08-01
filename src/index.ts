import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB!)
    .then(() => {
        console.log("DB Connected successful");
    })
    .catch((err) => {
        console.log(err);

    })

import express from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import AuthRouter from './routes/auth.routes';
import storageRouter from './routes/storage.router';
const app = express();
app.listen(process.env.PORT || 8080, () => {
    console.log(`server is running on port ${process.env.PORT}`);

})


app.use(cors(
    {
        origin: process.env.CLIENT,
        credentials: true
    }
));
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/auth', AuthRouter);
app.use('/storage', storageRouter)



