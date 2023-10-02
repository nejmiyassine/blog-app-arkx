import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import Container from '../Container';
import InputForm from '../InputForm';
import AuthButton from '../AuthButton';

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        login(credentials);
        navigate('/');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <Container>
            <div className='min-h-screen flex items-center overflow-hidden'>
                <div className='w-1/2 mx-auto h-screen flex flex-col justify-center p-4'>
                    <div className='text-center'>
                        <h2
                            className='font-bold text-4xl
                        '
                        >
                            Dive into the Online World.
                        </h2>
                        <p className='py-6 text-sm w-4/5 mx-auto text-gray-600 dark:text-gray-300'>
                            Welcome back to DigitalDive, please enter your
                            information & get access to your account.
                        </p>
                    </div>

                    <form
                        action=''
                        onSubmit={handleSubmitLogin}
                        className='w-4/5 mx-auto'
                    >
                        <InputForm
                            type='email'
                            label='Email'
                            id='email'
                            name='email'
                            placeholder='Enter your email'
                            value={credentials.email}
                            onChange={handleInputChange}
                            required
                        />
                        <InputForm
                            type='password'
                            label='Password'
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />

                        <AuthButton text='Login' />

                        <div className='py-3'>
                            <p className='flex gap-2 justify-center'>
                                <span>Dont Have an account?</span>
                                <Link
                                    to='/register'
                                    className='text-blue-600 dark:text-blue-400 font-semibold hover:underline underline-offset-4'
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <div className='w-1/2 max-h-screen relative'>
                    <div className='absolute top-0 bottom-0 w-full h-full bg-black/25'></div>
                    <img
                        className='w-fit object-cover'
                        src='https://images.unsplash.com/photo-1553697388-94e804e2f0f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80'
                        alt='Discover'
                    />
                </div>
            </div>
        </Container>
    );
};

export default LoginForm;
