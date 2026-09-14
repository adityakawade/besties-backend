import { Server } from "socket.io"

const videoSocket = (io: Server) => {
    io.on("connection", (socket) => {
        socket.on("offer", ({ offer, to }) => {
            io.to(to).emit("offer", { offer, from: socket.id })
        })

    })
}

export default videoSocket