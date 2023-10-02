import { PropTypes } from 'prop-types';
import useTheme from '../hooks/useTheme';

const Container = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`${theme === 'dark' ? 'dark' : ''}`}>
            <div className='bg-[#f5f6f7] dark:text-white dark:bg-[#222]'>
                <div className='container mx-auto'>{children}</div>
            </div>
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Container;
