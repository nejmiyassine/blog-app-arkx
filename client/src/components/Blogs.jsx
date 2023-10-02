import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../context/AuthContext';
import { fetchBlogs } from '../api/blogsApi';
import { imageUrl } from '../utils/imageUrl';
import { categories } from '../data/categories';

import BlogCard from './BlogCard';
import Container from './Container';
import CategoryFilter from './CategoryFilter';

const Blogs = () => {
    const { state } = useAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });
    const blogs = data;

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (isLoading) return <p>Loading ...</p>;

    if (isError) return <p>{error.message}</p>;

    return (
        state.user && (
            <Container>
                <section className='pb-8'>
                    <h2 className='text-3xl font-bold pt-12 text-center capitalize'>
                        Popular Topics
                    </h2>
                    <div className='flex items-center justify-between mt-8 mb-4'>
                        <ul className='flex gap-4 items-center'>
                            {categories.map((category) => (
                                <CategoryFilter
                                    key={category.id}
                                    label={category.label}
                                />
                            ))}
                        </ul>
                        <button className='border text-sm rounded-lg p-2'>
                            View all
                        </button>
                    </div>

                    <div className='grid grid-cols-3 gap-10'>
                        {blogs &&
                            blogs
                                .slice(0, 6)
                                .map((blog) => (
                                    <BlogCard
                                        key={blog._id}
                                        id={blog._id}
                                        image={imageUrl(blog.image)}
                                        title={blog.title}
                                        description={blog.description}
                                        category={blog.category}
                                        date={blog.createdAt}
                                    />
                                ))}
                    </div>
                </section>
            </Container>
        )
    );
};

export default Blogs;
