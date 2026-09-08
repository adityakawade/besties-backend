
import { Server } from "socket.io"

const chatSocket = (io: Server) => {
    io.on("connection", (socket) => {
        socket.on("message", (payload) => {
            io.to(payload.to).emit("message", {
                from: payload.from,
                message: payload.message
            })

        })

    })
}

export default chatSocket