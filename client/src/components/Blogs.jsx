import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { fetchBlogs } from '../api/blogsApi';

const Blogs = () => {
    const { state } = useAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    const basePath = 'http://localhost:8000';
    const imageUrl = (imagePath) =>
        `${basePath}/${imagePath.replace(/\\/g, '/')}`;

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (isLoading) return <p>Loading ...</p>;

    if (isError) return <p>{error.message}</p>;

    return state.user ? (
        <div className=''>
            {data &&
                data.map((blog) => (
                    <div key={blog._id} className='flex py-4 gap-10'>
                        <div>
                            <img
                                className='w-44'
                                src={`${imageUrl(blog.image)}`}
                                alt={blog.title}
                            />
                        </div>
                        <div>
                            <div>
                                <h2 className='font-bold text-4xl pb-4 hover:underline hover:underline-offset-8'>
                                    <Link to={`/blog/${blog._id}`}>
                                        {blog.title}
                                    </Link>
                                </h2>
                            </div>
                            <div className='pb-4'>
                                <p>{blog.description}</p>
                            </div>
                            <div>
                                <span>{blog.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    ) : (
        <div>
            <h2>not Authorized</h2>
        </div>
    );
};

export default Blogs;
