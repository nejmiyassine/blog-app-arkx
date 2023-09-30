import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_REACT_API_URL;

const token = Cookies.get('token');

export const fetchBlogs = async () => {
    try {
        const response = await axios.get(`${apiUrl}/blogs`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const fetchBlogById = async (blogId) => {
    try {
        const response = await axios.get(`${apiUrl}/blogs/${blogId}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const fetchUserBlogs = async (userId) => {
    const response = await axios.get(`${apiUrl}/users/${userId}/blogs`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
};

export const createBlog = async (newBlogData) => {
    try {
        const response = await axios.post(`${apiUrl}/blogs`, newBlogData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const updateBlog = async (blogId, updatedBlogData) => {
    try {
        console.log(blogId, updatedBlogData);
        const response = await axios.put(
            `${apiUrl}/blogs/${blogId}`,
            updatedBlogData,
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const response = await axios.delete(`${apiUrl}/blogs/${blogId}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};
