import PropTypes from 'prop-types';
import { AiOutlineLogin } from 'react-icons/ai';

const AuthButton = ({ text }) => {
    return (
        <div className='mt-3 mb-2 h-14 pl-4 flex items-center w-full justify-between bg-blue-600 text-white hover:bg-blue-800 transition ease-out font-semibold hover:cursor-pointer'>
            <button type='submit' className='uppercase'>
                {text}
            </button>
            <div className='bg-blue-800 h-full flex items-center px-4'>
                <AiOutlineLogin />
            </div>
        </div>
    );
};

AuthButton.propTypes = {
    text: PropTypes.string,
};

export default AuthButton;
