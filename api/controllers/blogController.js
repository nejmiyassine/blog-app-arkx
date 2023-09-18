const multer = require('multer');

const Blog = require('../models/Blog');

// Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
});

exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
    },
}).single('image'); // 'image' reference to name of input

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ data: blogs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const image = req.file ? req.file.path : '';
        const userId = req.user._id;

        const newBlog = new Blog({
            title,
            description,
            image,
            category,
            createdAt: Date.now(),
            user: userId,
        });

        const blog = await Blog.create(newBlog);
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            res.status(404).json({ message: 'Blog Not found' });
        }

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const updatedFields = {
            title,
            description,
            category,
        };

        if (req.file) {
            updatedFields.image = req.file.path;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updatedFields
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(204).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(204).json({ message: 'Blog deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
