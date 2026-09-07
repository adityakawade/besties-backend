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
import { createServer } from 'http'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import AuthRouter from './routes/auth.routes';
import storageRouter from './routes/storage.router';
import Authmiddleware from './middleware/auth.middleware';
import FriendRouter from './routes/friend.router';
import swaggerConfig from './utils/swagger';
import { serve, setup } from 'swagger-ui-express';
import { Server } from 'socket.io'


const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT,
        credentials: true
    }
})

server.listen(process.env.PORT || 8080, () => {
    console.log(`server is running on port ${process.env.PORT}`);

})

io.on('connection', (user) => {
    console.log('User connected');

    user.on('message', (msg) => {
        console.log(msg);
        user.broadcast.emit('message', "hello sir")

    })

})

app.use('/api-docs', serve, setup(swaggerConfig))
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
app.use('/storage', Authmiddleware, storageRouter)
app.use('/friend', Authmiddleware, FriendRouter);



