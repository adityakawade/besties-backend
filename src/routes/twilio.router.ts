import { Router } from 'express'
import { getTurnServer } from '../controllers/twilio.controller'
import Authmiddleware from '../middleware/auth.middleware'

const TwilioRouter = Router()

TwilioRouter.get("/turn-server", Authmiddleware, getTurnServer)

export default TwilioRouter