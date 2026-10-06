import mongoose, { model, Schema } from "mongoose"

const postSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    attachment: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: null
    },
    content: {
        required: true,
        type: String,

    }
}, { timestamps: true })



const postModel = model("Post", postSchema);

export default postModel