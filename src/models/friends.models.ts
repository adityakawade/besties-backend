import mongoose, { Schema, model } from 'mongoose'


const FriendSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    },

    friend: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    },


    status: {
        type: String,
        enum: ['requested', 'accepted'],
        default: 'requested'
    },


}, { timestamps: true })



FriendSchema.pre('save', async function (next) {
    try {
        const count = await model('Friend').countDocuments({ user: this.user, friend: this.friend })
        if (count > 0) {
            throw new Error("Friend request already sent")
        }

    } catch (error) {
        throw new Error("failed to send friend request")
    }
})


const FriendModel = model('Friend', FriendSchema)


export default FriendModel