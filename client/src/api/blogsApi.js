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
    console.log(newBlogData);
    try {
        console.log(`${apiUrl}/blogs`);
        const response = await axios.post(`${apiUrl}/blogs`, newBlogData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `${token}`,
            },
        });
        console.log('response: ', response.data);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

export const updateBlog = async (blogId, updatedBlogData) => {
    try {
        console.log('updateBlog called with blogId:', blogId);
        console.log('updateBlog called with updatedBlogData:', updatedBlogData);

        const response = await axios.put(
            `${apiUrl}/blogs/${blogId}`,
            updatedBlogData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
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
