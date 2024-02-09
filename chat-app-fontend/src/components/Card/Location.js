import React from 'react';

const Location = ({children,className}) => {
    return (
        <div className={`flex gap-2 text-[18px] ${className}`}>
            <span><i className="fa-solid fa-location-dot"></i></span>
            <span>{children}</span>
        </div>
    );
};

export default Location;