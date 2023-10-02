import PropTypes from 'prop-types';

const InputForm = (props) => {
    const { id, label, type, value, placeholder, onChange } = props;

    return (
        <div className='py-3 flex flex-col'>
            <label htmlFor={id} className='mb-1'>
                {label}
            </label>
            <input
                className='bg-transparent border-2 border-black p-2 rounded-sm dark:border-gray-300 focus:outline-blue-600'
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

InputForm.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

export default InputForm;
