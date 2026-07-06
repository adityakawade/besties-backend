import express from 'express'
import { forgotPassword, login, signup } from '../controllers/user.controller';

const AuthRouter = express.Router();
AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login);
AuthRouter.post('/forgot-password', forgotPassword);


export default AuthRouter