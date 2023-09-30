import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';

import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { fetchBlogById } from '../../api/blogsApi';

const BlogDetails = () => {
    const { id } = useParams();
    const { state } = useAuth();

    const basePath = 'http://localhost:8000';
    const imageUrl = (imagePath) =>
        `${basePath}/${imagePath.replace(/\\/g, '/')}`;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs', id],
        queryFn: () => fetchBlogById(id),
    });

    const userId = state.user._id;
    const blogUserId = data?.user;

    if (isLoading) return <p>Loading ...</p>;

    if (isError) return <p>{error.message}</p>;

    return (
        <div className='w-2/3'>
            <div>
                <img
                    className='w-screen h-80 object-fill'
                    src={`${imageUrl(data.image)}`}
                    alt={data.title}
                />
            </div>
            <div className='flex justify-between py-6'>
                <div>
                    <h2 className='font-bold text-3xl'>{data.title}</h2>
                </div>
                <div>
                    {userId === blogUserId && (
                        <div className='flex gap-6'>
                            <Link to={`/edit-blog/${data._id}`}>
                                <AiFillEdit
                                    className='cursor-pointer'
                                    size={24}
                                    color={'#00ff00'}
                                />
                            </Link>
                            <MdDelete
                                className='cursor-pointer'
                                size={24}
                                color={'#ff0000'}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <p>{data.description}</p>
            </div>
        </div>
    );
};

export default BlogDetails;
