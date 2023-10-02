import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryFilter = ({ label }) => {
    return (
        <li className='italic text-sm hover:text-blue-600 dark:hover:text-blue-400'>
            <Link>{label}</Link>
        </li>
    );
};

CategoryFilter.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
};

export default CategoryFilter;
