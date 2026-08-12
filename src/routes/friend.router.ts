import { Router } from 'express'
import { addFriend, fetchFriend, suggestFriend } from '../controllers/friend.controller';

const FriendRouter = Router();

FriendRouter.post('/', addFriend)
FriendRouter.get('/', fetchFriend)
FriendRouter.get('/suggestion', suggestFriend)

export default FriendRouter