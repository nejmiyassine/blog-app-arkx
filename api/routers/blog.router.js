const express = require('express');
const router = express.Router();

const { upload } = require('../controllers/blog.controller');

const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require('../controllers/blog.controller');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

router.post('/', upload, createBlog);
router.put('/:id', upload, updateBlog);

router.delete('/:id', deleteBlog);

module.exports = router;
