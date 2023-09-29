const RegisterForm = () => {
    return (
        <div>
            <h2>Register Form</h2>
            <form action=''>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        placeholder='Enter your username'
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        placeholder='Enter your email'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='text'
                        id='password'
                        name='password'
                        placeholder='Enter your password'
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>
                        Confirm your password:
                    </label>
                    <input
                        type='text'
                        id='confirmPassword'
                        name='confirmPassword'
                        placeholder='Confirm your password'
                    />
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
