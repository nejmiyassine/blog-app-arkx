import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import Container from '../components/Container';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { state, logout } = useAuth();

    const handleLogout = () => logout();

    return (
        <Container>
            <div className='flex justify-between items-center h-16'>
                <div>
                    <h2 className='font-bold text-2xl'>
                        <Link to='/'>DigitalDive</Link>
                    </h2>
                </div>
                <nav>
                    <ul className='flex gap-6'>
                        {state.user && (
                            <>
                                <li>
                                    <Link
                                        className='hover:text-[#3498db] dark:hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-semibold'
                                        to='/my-blogs'
                                    >
                                        My Blogs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='hover:text-[#3498db] dark:hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-semibold'
                                        to='/create-blog'
                                    >
                                        Create Blog
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className='cursor-pointer hover:text-[#3498db] dark:hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-semibold'>
                            Travel
                        </li>
                        <li className='cursor-pointer hover:text-[#3498db] dark:hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-semibold'>
                            Sport
                        </li>
                        <li className='cursor-pointer hover:text-[#3498db] dark:hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-semibold'>
                            Technology
                        </li>
                        <li className='cursor-pointer hover:text-[#3498db] dark:hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-semibold'>
                            Psychology
                        </li>
                        <li className='cursor-pointer hover:text-[#3498db] dark:hover:text-blue-400 hover:underline hover:underline-offset-4 hover:font-semibold'>
                            Self Improvement
                        </li>
                    </ul>
                </nav>

                {state.user && (
                    <div className='flex gap-4'>
                        <div className='flex items-center gap-2 cursor-pointer'>
                            <img
                                src={state.user.image}
                                alt={state.username}
                                width={24}
                                height={24}
                            />
                            <p>{state.user.username}</p>
                        </div>
                        <div className='flex items-center gap-2 border-2 border-black dark:border-white p-2 hover:border-gray-600 hover:bg-black hover:text-white hover:cursor-pointer dark:hover:bg-gray-400'>
                            <button
                                onClick={handleLogout}
                                className='font-semibold'
                            >
                                Logout
                            </button>
                            <FiLogOut />
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Header;
