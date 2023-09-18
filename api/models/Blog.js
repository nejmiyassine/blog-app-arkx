const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This should match the model name for your User schema
    },
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
