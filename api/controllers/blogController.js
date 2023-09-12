const blogHelpers = require('../helpers/blogHelpers');
const multer = require('multer');

// Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '_' + Date.now() + '_' + file.originalname);
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
        const blogs = await blogHelpers.getAllBlogs();
        res.json({ data: blogs, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const image = req.file.path;

        const newBlog = new Blog({
            title,
            description,
            image,
            category,
            createdAt: Date.now(),
        });

        const blog = await blogHelpers.createBlog(newBlog);
        const savedBlog = blog.save();

        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await blogHelpers.getBlogById(req.params.id);
        if (!blog) {
            res.status(404).json({ message: 'Blog Not found' });
        }
        res.json(blog);
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

        const updatedBlog = await blogHelpers.updateBlog(
            req.params.id,
            updatedFields
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await blogService.deleteBlog(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
