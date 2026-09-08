
import * as cookie from 'cookie'
import { Server } from "socket.io"
import jwt from 'jsonwebtoken'

const onlineUsers = new Map()

const statusSocket = (io: Server) => {
    io.on("connection", (socket) => {
        try {
            const rawCookie = socket.handshake.headers.cookie || "";
            const cookies = cookie.parseCookie(rawCookie)
            const accessToken = cookies.accessToken
            if (!accessToken) {
                throw new Error("Acess token not found")
            }

            const user = jwt.verify(accessToken, process.env.JWT_SECRET!)
            onlineUsers.set(socket.id, user)


            io.emit("online", Array.from(onlineUsers.values()))

            socket.on("get-online", () => {
                io.emit("online", Array.from(onlineUsers.values()))
            })

            socket.on("disconnect", () => {
                onlineUsers.delete(socket.id)
                io.emit("online", Array.from(onlineUsers.values()))
            })

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                socket.disconnect()
            }

        }

    })
}

export default statusSocket