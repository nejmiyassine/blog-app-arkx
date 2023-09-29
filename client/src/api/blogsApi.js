import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_API_URL;

export const fetchBlogs = async () => {
    const response = await axios.get(`${apiUrl}/blogs`);
    return response.data;
};

export const createBlog = async (newBlogData) => {
    const response = await axios.post(`${apiUrl}/blogs`, newBlogData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};

export const updateBlog = async (blogId, updatedBlogData) => {
    const response = await axios.put(
        `${apiUrl}/blogs/${blogId}`,
        updatedBlogData
    );
    return response.data;
};

export const deleteBlog = async (blogId) => {
    const response = await axios.delete(`blogs/${blogId}`);
    return response.data;
};
