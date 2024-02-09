import React, { useRef } from 'react';
import avatarMan from '../../assets/avatarMan.jpeg'
import StatusUser from './StatusUser';
const HeaderFormChat = ({isDarkMode,info,onBack}) => {
  
    return (
        <div className='w-full max-sm:flex max-sm:items-center max-sm:gap-4 py-4 border border-transparent border-b-gray-400'>
            <div className='md:hidden max-sm:flex gap-2 text-[18px]' onClick={onBack}>
                <span><i class="fa-solid fa-arrow-left"></i></span>
                <span>Back</span>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='w-[40px] h-[40px] rounded-full'>
                    <img src={info.avatar ||  avatarMan} className='rounded-full w-full h-full'></img>
                </div>
                <div className=' flex flex-col'>
                    <span className={`${isDarkMode ? 'text-white' : 'text-black'} text-[18px]`}>{info.fullName}</span>
                    <div className={`${isDarkMode ? 'text-white' : 'text-black'} text-[16px]`}>
                        <StatusUser active={info.status === 'ONLINE'}>{info.status}</StatusUser>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderFormChat;