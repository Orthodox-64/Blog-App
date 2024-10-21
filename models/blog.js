const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
    title: {
        type: String,  // Added 'type' for title
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: false,  // Fixed typo: 'require' -> 'required'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const Blog = model('blogs', blogSchema);
module.exports = Blog