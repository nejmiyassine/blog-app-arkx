import PropTypes from 'prop-types';
import { AiFillFileImage } from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { categories } from '../../data/categories';
import { fetchBlogById, createBlog, updateBlog } from '../../api/blogsApi';

const BlogForm = ({ blogId }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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
        queryFn: () => fetchBlogById(blogId),
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
            updateBlogMutation.mutateAsync(blogId, updatedBlogData);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const blogData = { ...formData };

            if (image) {
                blogData.image = image;
            }

            if (blogId) {
                handleUpdateBlog(blogId, blogData);
            }

            handleCreateBlog(blogData);

            navigate('/');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
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
        <div className='min-h-screen'>
            <form action='' onSubmit={handleSubmit}>
                {existingBlog && (
                    <input type='hidden' name='id' value={existingBlog.id} />
                )}

                <div className='flex flex-col py-4'>
                    <label htmlFor='title'>Title:</label>
                    <input
                        className='text-gray-700 dark:text-white bg-white dark:bg-[#444] border-2 border-black p-2 rounded-sm dark:border-gray-300 focus:outline-blue-600'
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
                        className='w-full h-40 text-gray-700 dark:text-white bg-white dark:bg-[#444] border-2 border-black p-2 rounded-sm dark:border-gray-300 focus:outline-blue-600'
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
                        className='text-gray-700 dark:text-black text-gray-700 p-2 dark:text-white bg-white dark:bg-[#444]  border-2 border-black rounded-sm dark:border-gray-300 focus:outline-blue-600'
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
                <div className='flex items-center h-20'>
                    <label
                        htmlFor='image'
                        className='cursor-pointer relative bg-indigo-600 text-white py-4 px-4 rounded-lg shadow-lg'
                    >
                        <span className='absolute top-0 left-0 right-0 bottom-0 opacity-0 z-10 cursor-pointer'></span>
                        <span className='flex items-center gap-2'>
                            Upload Image <AiFillFileImage />
                        </span>
                        <input
                            className='absolute inset-0 opacity-0 z-20'
                            type='file'
                            name='image'
                            id='image'
                            value={formData.image}
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                </div>
                <div>
                    <button
                        className='mt-4 bg-blue-600 text-white font-semibold p-4 rounded-lg flex items-center gap-2'
                        type='submit'
                    >
                        Submit <FaPaperPlane />
                    </button>
                </div>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    blogId: PropTypes.string,
};

export default BlogForm;
