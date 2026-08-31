import { Router } from 'express'
import { addFriend, deleteFriend, fetchFriend, suggestFriend } from '../controllers/friend.controller';

const FriendRouter = Router();

FriendRouter.post('/', addFriend)
FriendRouter.get('/', fetchFriend)
FriendRouter.get('/suggestion', suggestFriend)
FriendRouter.delete('/:id', deleteFriend)

export default FriendRouter