import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import Container from '../Container';
import InputForm from '../InputForm';

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
            <h2>Login Form</h2>
            <form action='' onSubmit={handleSubmitLogin}>
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
                <div className='btn'>
                    <button type='submit'>Login</button>
                </div>
                <div>
                    <p>
                        Dont Have an account?
                        <Link to='/register'>Create an account</Link>
                    </p>
                </div>
            </form>
        </Container>
    );
};

export default LoginForm;
