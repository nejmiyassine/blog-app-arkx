import useTheme from '../hooks/useTheme';
import { FiSun } from 'react-icons/fi';
import { BsFillMoonFill } from 'react-icons/bs';

const ToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className='rounded-full p-4 fixed bottom-8 right-8 bg-gray-400 dark:bg-white'
            onClick={toggleTheme}
        >
            {theme === 'light' ? (
                <FiSun size={20} color='#FFD700' />
            ) : (
                <BsFillMoonFill size={20} color='#800080 ' />
            )}
        </button>
    );
};

export default ToggleButton;
