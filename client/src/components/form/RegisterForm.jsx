import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Container from '../Container';
import InputForm from '../InputForm';

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
            <div className='min-h-screen flex flex-col justify-center items-center'>
                <h2 className='text-center font-bold text-3xl mb-8'>
                    Register Form
                </h2>
                <form action='' onSubmit={handleRegisterSubmit}>
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
                    <div className='btn'>
                        <button type='submit'>Register Now!</button>
                    </div>
                    <div>
                        <p>
                            Do you Have an account?
                            <Link to='/login'>Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </Container>
    );
};

export default RegisterForm;
