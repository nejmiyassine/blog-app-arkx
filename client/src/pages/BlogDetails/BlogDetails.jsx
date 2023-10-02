import { MdModeEdit, MdDelete } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';

import { deleteBlog } from '../../api/blogsApi';
import { fetchBlogById } from '../../api/blogsApi';
import { imageUrl } from '../../utils/imageUrl';
import Container from '../../components/Container';

const BlogDetails = () => {
    const { id } = useParams();
    const { state } = useAuth();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs', id],
        queryFn: () => fetchBlogById(id),
    });

    const userId = state.user._id;
    const blogUserId = data?.user;

    const deleteBlogMutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    const handleDeleteBlog = (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            deleteBlogMutation.mutate(blogId);
        }
    };

    if (isLoading) return <p>Loading ...</p>;

    if (isError) return <p>{error.message}</p>;

    return (
        <Container>
            <div className='w-2/3 min-h-screen'>
                <div>
                    <img
                        className='w-screen h-[500px] object-cover'
                        src={`${imageUrl(data.image)}`}
                        alt={data.title}
                    />
                </div>
                <div className='flex items-center justify-between py-6'>
                    <div>
                        <h2 className='font-bold text-3xl'>{data.title}</h2>
                    </div>
                    <div>
                        {userId === blogUserId && (
                            <div className='flex gap-6'>
                                <Link to={`/edit-blog/${data._id}`}>
                                    <MdModeEdit
                                        className='cursor-pointer'
                                        size={20}
                                        color={'#00ff00'}
                                    />
                                </Link>
                                <MdDelete
                                    className='cursor-pointer'
                                    size={20}
                                    color={'#ff0000'}
                                    onClick={() => handleDeleteBlog(data._id)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <p className='leading-10'>{data.description}</p>
                </div>
            </div>
        </Container>
    );
};

export default BlogDetails;
