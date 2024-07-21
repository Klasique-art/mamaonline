import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type, onClose }) => {
    let alertStyle;

    switch (type) {
        case 'success':
            alertStyle = 'bg-cyan-700 text-white';
            break;
        case 'error':
            alertStyle = 'bg-red-500 text-white';
            break;
        case 'info':
            alertStyle = 'bg-blue-500 text-white';
            break;
        default:
            alertStyle = 'bg-gray-500 text-white';
            break;
    }

    // Close the alert after 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 8000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-16 right-8 max-w-sm w-full p-4 rounded-lg shadow-lg ${alertStyle} z-[9000]`} role='alert'>
            <div className="flex items-center justify-between">
                <p className="text-sm sm:text-lg">{message}</p>
                <button onClick={onClose} className="ml-4 text-lg font-semibold ">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'info']),
    onClose: PropTypes.func.isRequired,
};

Alert.defaultProps = {
    type: 'info',
};

export default Alert;
