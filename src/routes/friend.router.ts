import { Router } from 'express'
import { addFriend, deleteFriend, fetchFriend, friendRequest, suggestFriend, updateFriendStatus } from '../controllers/friend.controller';

const FriendRouter = Router();

FriendRouter.post('/', addFriend)
FriendRouter.get('/', fetchFriend)
FriendRouter.get('/suggestion', suggestFriend)
FriendRouter.delete('/:id', deleteFriend)
FriendRouter.get('/request', friendRequest)
FriendRouter.put('/:id', updateFriendStatus)

export default FriendRouter