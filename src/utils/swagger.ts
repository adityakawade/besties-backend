import AuthApiDocs from "../swagger/auth.swagger"
import FriendApiDocs from "../swagger/Friend.swagger"
import StorageApiDocs from "../swagger/storage.swagger"

const swaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Besties official api",
        description: "All public and private apis listed here",
        version: "1.0.0",
        contact: {
            name: "Er Aditya",
            email: "adityakawade9696@gmail.com"
        }

    },

    servers: [
        { url: process.env.SERVER }
    ],

    paths: {
        ...AuthApiDocs,
        ...StorageApiDocs,
        ...FriendApiDocs
    }
}

export default swaggerConfig