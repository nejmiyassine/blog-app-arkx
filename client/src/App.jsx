import { Link } from 'react-router-dom';
import ToggleButton from './components/ToggleButton';
import useTheme from './hooks/useTheme';

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={` ${theme === 'dark' ? 'dark' : ''}`}>
            <div className={`min-h-screen dark:text-white dark:bg-[#222]`}>
                <ToggleButton />
                <div className='container mx-auto '>
                    <h2 className='font-bold text-2xl'>
                        Hello Everyone: Our Theme is {theme}
                    </h2>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default App;
