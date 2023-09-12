const Blog = require('../models/Blog');

exports.getAllBlog = async () => {
    return await Blog.find();
};

exports.createBlog = async (blog) => {
    return await Blog.create(blog);
};

exports.getBlogById = async (id) => {
    return await Blog.findById(id);
};

exports.updateBlog = async (id, blog) => {
    return await Blog.findByIdAndUpdate(id, blog);
};

exports.createBlog = async (id) => {
    return await Blog.findByIdAndDelete(id);
};
