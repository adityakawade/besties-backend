import express from 'express'
import { refreshToken, getSession, login, signup, updateProfilePicture } from '../controllers/user.controller';
import Authmiddleware from '../middleware/auth.middleware';
import RefreshToken from '../middleware/refrehToken.middleware';


const AuthRouter = express.Router();
AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login);
AuthRouter.get('/refresh-token',RefreshToken, refreshToken);
AuthRouter.get('/session', getSession);
AuthRouter.put('/profile-picture', Authmiddleware, updateProfilePicture)


export default AuthRouter