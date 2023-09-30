import PropTypes from 'prop-types';

const InputForm = (props) => {
    const { id, label, type, value, placeholder, onChange } = props;

    return (
        <div className='py-4'>
            <label htmlFor={id}>{label}:</label>
            <input
                className='bg-transparent'
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
