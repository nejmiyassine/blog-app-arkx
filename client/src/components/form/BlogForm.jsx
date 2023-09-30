import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { categories } from '../../data/categories';
import {
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
} from '../../api/blogsApi';

const BlogForm = () => {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
    });
    const [image, setImage] = useState(null);

    // Queries
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    // Mutations
    const createBlogMutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    const updateBlogMutation = useMutation({
        mutationFn: updateBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    const deleteBlogMutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    const handleCreateBlog = (newBlogData) =>
        createBlogMutation.mutate(newBlogData);

    const handleUpdateBlog = (blogId, updatedBlogData) =>
        updateBlogMutation.mutate({ id: blogId, updatedBlogData });

    const handleDeleteBlog = (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            deleteBlogMutation.mutate(blogId);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateBlog(formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{error.message}</p>;

    return (
        <div className='container mx-auto'>
            <h2>Blog</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor='title'>Title:</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={formData.title}
                        placeholder='Enter your title'
                        onChange={handleInputChange}
                        className='text-gray-700 dark:text-black'
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        placeholder='Enter your description'
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='category'>Category:</label>
                    <select
                        name='category'
                        id='categort'
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        {categories &&
                            categories.map(({ id, value, label }) => {
                                <option key={id} value={value} selected>
                                    {label}
                                </option>;
                            })}
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='image'>Select images to upload:</label>
                    <input
                        type='file'
                        name='image'
                        id='image'
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
