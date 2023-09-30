import BlogForm from '../../components/form/BlogForm';

const CreateBlog = () => {
    const blogId = null;

    return (
        <div>
            <h1 className='font-bold text-2xl py-4 text-center'>Create Blog</h1>
            <BlogForm blogId={blogId} />
        </div>
    );
};

export default CreateBlog;
