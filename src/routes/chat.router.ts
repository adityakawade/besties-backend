import { Router } from "express";
import Authmiddleware from "../middleware/auth.middleware";
import { fetchChats } from "../controllers/chat.controller";

const chatRouter = Router()

chatRouter.get('/:to', Authmiddleware, fetchChats)


export default chatRouter