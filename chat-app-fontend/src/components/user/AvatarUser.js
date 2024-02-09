import React from 'react';
import avatarMan from '../../assets/avatarMan.jpeg'
import avatarWomen from '../../assets/avatarWomen.jpg'
import menuStrategy from 'components/helper/menuStrategy';
import { useDarkModeContext } from 'contexts/DarkModeContext';
const avatars = {
    male: avatarMan,
    female: avatarWomen
}
const AvatarUser = ({user,children}) => {
    const {isDarkMode} = useDarkModeContext()
    
    return (
        <div className={`relative w-[44px] h-[44px]  p-1  avatar-user ${isDarkMode && 'sub-menu'}`}>
            <img srcSet={user.avatar ? user.avatar : avatars[user.gender]} className='object-contain w-full h-full rounded-full'></img>
            {children && children}
        </div>
    );
};

export default AvatarUser;