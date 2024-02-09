import React, { useEffect, useRef } from 'react';
import AvatarUser from './AvatarUser';
import menuStrategy from 'components/helper/menuStrategy';
import { useSelector } from 'react-redux';
import { useDarkModeContext } from 'contexts/DarkModeContext';

const FeatureUser = () => {
    const user = useSelector(state => state.user)
    const Component = menuStrategy[`${user.info.roleName}`]
    const {isDarkMode} = useDarkModeContext();
    const menuRef = useRef(null)
    useEffect(() => {
        if(menuRef && menuRef.current){
            const menu = document.querySelector('.list-menu')
            console.log(menu.offsetHeight);
            
        }
    },[menuRef.current?.offsetHeight])
    return (
        <AvatarUser user={user.info}>
            <div ref={menuRef} className={`absolute menu-list bg-sub rounded-md py-2 z-[1000] hidden ${isDarkMode ? 'bottom-[-60px]' : 'bottom-[-42px]'} md:left-[50%] max-sm:right-0 translate-y-[32px] w-[200px] shadow-lg feature-user transition-all`}>
                <Component></Component>
            </div>
        </AvatarUser>
    );
};

export default FeatureUser;