import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchBlogById, createBlog, updateBlog } from '../../api/blogsApi';

const BlogForm = ({ blogId }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const categories = [
        {
            id: 1,
            value: 'fashion',
            label: 'Fashion',
        },
        {
            id: 2,
            value: 'programming',
            label: 'Programming',
        },
        {
            id: 3,
            value: 'self-improvement',
            label: 'Self Improvement',
        },
        {
            id: 4,
            value: 'psychology',
            label: 'Psychology',
        },
        {
            id: 5,
            value: 'productivity',
            label: 'Productivity',
        },
        {
            id: 6,
            value: 'health',
            label: 'Health',
        },
    ];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
    });
    const [image, setImage] = useState(null);

    const {
        data: existingBlog,
        isError,
        error,
    } = useQuery({
        queryKey: ['blogs', blogId],
        mutationFn: () => fetchBlogById(blogId),
        enabled: !!blogId, // Only fetch when blogId is provided
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

    const handleCreateBlog = (newBlogData) =>
        createBlogMutation.mutate(newBlogData);

    const handleUpdateBlog = (blogId, updatedBlogData) => {
        if (blogId) {
            updateBlogMutation.mutate(blogId, updatedBlogData);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = { ...formData };

        if (image) {
            blogData.image = image;
        }

        if (blogId) {
            handleUpdateBlog(blogData);
        }

        handleCreateBlog(blogData);
        navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (existingBlog) {
            setFormData({
                title: existingBlog.title,
                description: existingBlog.description,
                category: existingBlog.category,
            });
        }
    }, [existingBlog]);

    if (isError) return <p>{error.message}</p>;

    return (
        <div className='container mx-auto'>
            <form action='' onSubmit={handleSubmit}>
                {existingBlog && (
                    <input type='hidden' name='id' value={existingBlog.id} />
                )}

                <div className='flex flex-col py-4'>
                    <label htmlFor='title'>Title:</label>
                    <input
                        className='text-gray-700 dark:text-black'
                        type='text'
                        name='title'
                        id='title'
                        value={formData.title}
                        placeholder='Enter your title'
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='flex flex-col py-4'>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        className='text-gray-700 dark:text-black'
                        type='text'
                        name='description'
                        id='description'
                        placeholder='Enter your description'
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='flex flex-col py-4'>
                    <label htmlFor='category'>Category:</label>
                    <select
                        className='text-gray-700 dark:text-black'
                        id='category'
                        name='category'
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value=''>Select an option</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col py-4'>
                    <label htmlFor='image'>Select images to upload:</label>
                    <input
                        type='file'
                        name='image'
                        id='image'
                        value={formData.image}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    blogId: PropTypes.string,
};

export default BlogForm;
