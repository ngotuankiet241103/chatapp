import React from 'react';

const Tag = ({children}) => {
    return (
        <div className='p-2 rounded-xl bg-[#F2F2F2]'>
            {children}
        </div>
    );
};

export default Tag;