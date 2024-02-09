import React from 'react';

const TitleSection = ({children}) => {
    return (
        <div className='relative text-[#3A1097] text-[28px]'>
            {children}
            <div className='absolute top-[-10px] left-0 w-[60px] h-[3px] bg-[#00D1ED]'></div>
        </div>
    );
};

export default TitleSection;