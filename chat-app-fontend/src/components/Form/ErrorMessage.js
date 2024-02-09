import React from 'react';

const ErrorMessage = ({message,className}) => {
    return (
        <div className={`text-red-500 text-[12px]`}>
            {message}
        </div>
    );
};

export default ErrorMessage;