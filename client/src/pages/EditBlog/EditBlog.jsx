import Container from '../../components/Container';
import BlogForm from '../../components/form/BlogForm';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
    const params = useParams();

    return (
        <Container>
            <div>
                <h1 className='font-bold text-2xl py-4 text-center'>
                    Edit Blog
                </h1>
                <BlogForm blogId={params.blogId} />
            </div>
        </Container>
    );
};

export default EditBlog;
