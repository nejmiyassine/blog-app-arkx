import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../context/AuthContext';
import { fetchUserBlogs } from '../api/blogsApi';
import { Link } from 'react-router-dom';
import DataTable from './DataTable';
import Container from './Container';

const MyBlogs = () => {
    const { state } = useAuth();
    const userId = state.user._id;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs', userId],
        queryFn: () => fetchUserBlogs(userId),
    });

    const blogs = data;

    if (isLoading) return <p>Loading ...</p>;

    if (isError) return <p>{error.message}</p>;

    return (
        <Container>
            <div className='min-h-screen'>
                {blogs ? (
                    <div>
                        <h2 className='font-bold text-3xl text-center py-8'>
                            My blogs
                        </h2>
                        <DataTable data={blogs} />
                    </div>
                ) : (
                    <div>
                        <Link to='/create-blog' className='underline-offset-8'>
                            <h2>Create Your First Blog</h2>
                        </Link>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default MyBlogs;
