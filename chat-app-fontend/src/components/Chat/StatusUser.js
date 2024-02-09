import React from 'react';

const StatusUser = ({active,children}) => {
    return (
        <div className='flex gap-2 items-center'>
            <p className={`w-[12px] h-[12px] rounded-full ${active ? 'bg-green-500' : 'bg-gray-400'} `}></p>
            <span>{children}</span>
        </div>
    );
};

export default StatusUser;