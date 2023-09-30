import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogById } from '../../api/blogsApi';
import { useAuth } from '../../context/AuthContext';

const BlogDetails = () => {
    const { id } = useParams();
    const { state } = useAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs', id],
        queryFn: () => fetchBlogById(id),
    });

    if (isLoading) return <p>Loading ...</p>;
    if (isError) return <p>{error.message}</p>;

    return (
        <div>
            <div>
                <img src={data.image} alt={data.title} />
            </div>
            <div>
                <h2>{data.title}</h2>
                <p>{data.description}</p>
            </div>
            {state?.user?._id === id && (
                <div>
                    <p>Edit</p>
                    <p>Delete</p>
                </div>
            )}
        </div>
    );
};

export default BlogDetails;
