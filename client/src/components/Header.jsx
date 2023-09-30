import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { state, logout } = useAuth();

    const handleLogout = () => logout();

    return (
        <div className='flex justify-between items-center h-16'>
            <div>
                <h2 className='font-bold text-2xl'>
                    <Link to='/'>ARKx Blog</Link>
                </h2>
            </div>
            <nav>
                {!state.user ? (
                    <ul className='flex gap-10'>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </ul>
                ) : (
                    <div className='flex gap-6'>
                        <ul className='flex gap-6'>
                            <li>
                                <Link to='/my-blogs'>My Blogs</Link>
                            </li>
                            <li>
                                <Link to='/create-blog'>Create Blog</Link>
                            </li>
                        </ul>
                        <div className='flex gap-3'>
                            <img
                                src={state.user.image}
                                alt={state.username}
                                width={24}
                                height={24}
                            />
                            <div>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Header;
