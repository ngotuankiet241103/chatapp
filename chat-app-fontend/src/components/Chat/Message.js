import { useDarkModeContext } from 'contexts/DarkModeContext';
import React from 'react';

const Message = ({isSender,children}) => {
    const {isDarkMode} = useDarkModeContext()
    return (
        <div className={`flex flex-col   ${isSender ? 'items-end' :  'items-start'} mb-2`}>
            <div className={`max-sm:max-w-[50%] ${isDarkMode ? 'text-[#333]' : ''} ${isSender ? 'bg-primary' : ' bg-[#f2f2f2]'} rounded-lg p-1`}>
                {children}
            </div>
        </div>
       
    );
};

export default Message;