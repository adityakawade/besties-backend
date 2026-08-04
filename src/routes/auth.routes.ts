import express from 'express'
import { forgotPassword, getSession, login, signup, updateProfilePicture } from '../controllers/user.controller';
import Authmiddleware from '../middleware/auth.middleware';


const AuthRouter = express.Router();
AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login);
AuthRouter.post('/forgot-password', forgotPassword);
AuthRouter.get('/session', getSession);
AuthRouter.put('/profile-picture', Authmiddleware, updateProfilePicture)


export default AuthRouter