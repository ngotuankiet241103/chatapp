import React from 'react';
import avatarMan from '../../assets/avatarMan.jpeg'
import { useChatContext } from 'contexts/ChatContext';
import { useDarkModeContext } from 'contexts/DarkModeContext';
const MessagingItem = ({isNoti,data,active,onClick}) => {
    const {isDarkMode} = useDarkModeContext()
    return (
        <div className={`${isDarkMode && active && 'text-sub'} relative w-full rounded-lg message-item p-2 bg-[#f2f2f2] ${active && 'active'}`}  onClick={onClick}>
            <div className='flex gap-4 items-center'>
                <div className='w-[40px] h-[40px] rounded-full'>
                    <img src={data.avatar || avatarMan} className='rounded-full w-full h-full'></img>
                </div>
                <div className='text-[18px]'>
                    <span>{data.fullName}</span>
                </div>
            </div>
            {isNoti && !active && <div className='absolute  top-[50%] right-4 translate-y-[-50%] w-4 h-4 bg-primary rounded-full' ></div>}
            
        </div>
    );
};

export default MessagingItem;