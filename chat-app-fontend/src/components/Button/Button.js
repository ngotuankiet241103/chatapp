import React from 'react';

const Button = ({children, onClick,className}) => {
    return (
        <button className={`bg-primary px-4 py-2 rounded-lg text-white ${className}`} onClick={onClick}>{children}</button>
    );
};

export default Button;