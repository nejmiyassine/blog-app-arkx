import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { sliceText } from '../utils/sliceText';

const BlogCard = ({ id, image, title, description, category, date }) => {
    const postedDate = moment(date).fromNow();

    return (
        <div className='relative rounded-lg'>
            <Link to={`/blog/${id}`}>
                <img
                    src={image}
                    alt={title}
                    className='w-full rounded-lg h-72 mb-2 object-fill'
                />
                <h2 className='text-2xl font-semibold mb-2 text-black dark:text-white'>
                    {sliceText(title, 50)}
                </h2>
                <p className='text-gray-600 dark:text-gray-400 text-md mb-2'>
                    {sliceText(description, 200)}
                </p>
                <div className='absolute top-6 right-6 z-[100]'>
                    <span className='bg-blue-600 text-white text-xs py-1 px-2 rounded-full'>
                        {category}
                    </span>
                </div>
                <p className='text-sm'>{postedDate}</p>
            </Link>
        </div>
    );
};

BlogCard.propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
};

export default BlogCard;
