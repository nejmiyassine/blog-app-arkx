import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

import { fetchBlogs } from '../api/blogsApi';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const { state } = useAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });
    const blogs = data?.data;

    if (isLoading) return <p>Loading ...</p>;
    if (isError) return <p>{error.message}</p>;

    return state.user ? (
        <div className=''>
            {blogs &&
                blogs.map((blog) => (
                    <div key={blog._id} className='py-4'>
                        <div>
                            <img src={`${blog.image}`} alt={blog.title} />
                        </div>
                        <div>
                            <p>
                                <Link to={`/blog/${blog._id}`}>
                                    {blog.title}
                                </Link>
                            </p>
                            <p>{blog.description}</p>
                            <p>{blog.category}</p>
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
