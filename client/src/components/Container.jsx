import useTheme from '../hooks/useTheme';

const Container = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`${theme === 'dark' ? 'dark' : ''}`}>
            <div className='min-h-screen dark:text-white dark:bg-[#222]'>
                <div className='container mx-auto'>{children}</div>
            </div>
        </div>
    );
};

export default Container;
