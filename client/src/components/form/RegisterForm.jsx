import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Container from '../Container';
import InputForm from '../InputForm';
import AuthButton from '../AuthButton';

const RegisterForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.confirmPassword) {
            return;
        }

        register(credentials);
        navigate('/');
    };

    return (
        <Container>
            <div className='min-h-screen flex items-center overflow-hidden'>
                <div className='w-1/2 mx-auto h-screen flex flex-col justify-center p-4'>
                    <div className='text-center'>
                        <h2 className='font-bold text-4xl'>
                            Create new account
                        </h2>
                        <p className='py-6 mx-auto text-sm text-gray-600 dark:text-gray-300'>
                            Welcome to DigitalDive – Your Passport to the Online
                            World! 🌍
                        </p>
                    </div>
                    <form
                        action=''
                        onSubmit={handleRegisterSubmit}
                        className='w-4/5 mx-auto'
                    >
                        <InputForm
                            type='username'
                            label='Username'
                            id='username'
                            name='username'
                            placeholder='Enter your username'
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                        />
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
                        <InputForm
                            type='password'
                            label='Confirm Password'
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder='Confirm your Password'
                            value={credentials.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />

                        <AuthButton text='create account' />

                        <div className='mt-3'>
                            <p className='flex gap-2 justify-center'>
                                <span>Already Have account!</span>
                                <Link
                                    to='/login'
                                    className='text-blue-600 dark:text-blue-400 font-semibold hover:underline underline-offset-4'
                                >
                                    Login
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
                        alt='Passport'
                    />
                </div>
            </div>
        </Container>
    );
};

export default RegisterForm;
