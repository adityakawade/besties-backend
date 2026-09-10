
import { Server } from "socket.io"
import { createChat } from "../controllers/chat.controller"
import { downloadObject } from "../utils/s3"

const chatSocket = (io: Server) => {
    io.on("connection", (socket) => {
        socket.on("message", (payload) => {
            createChat({
                ...payload,
                from: payload.from._id
            })
            io.to(payload.to).emit("message", {
                from: payload.from,
                message: payload.message
            })
        })


        socket.on("attachment", async (payload) => {
            createChat({
                ...payload,
                from: payload.from._id
            })
            io.to(payload.to).emit("attachment", {
                from: payload.from,
                message: payload.message,
                file: {
                    path: await downloadObject(payload.file.path),
                    type: payload.file.type
                }
            })
        })

    })
}

export default chatSocket