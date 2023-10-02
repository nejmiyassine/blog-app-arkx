import Container from '../../components/Container';
import BlogForm from '../../components/form/BlogForm';

const CreateBlog = () => {
    const blogId = null;

    return (
        <Container>
            <div>
                <h1 className='font-bold text-2xl py-4 text-center'>
                    Create Your Blog
                </h1>
                <BlogForm blogId={blogId} />
            </div>
        </Container>
    );
};

export default CreateBlog;
