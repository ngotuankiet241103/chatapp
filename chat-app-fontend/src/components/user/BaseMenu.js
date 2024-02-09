import React from 'react';
import Logout from './Logout';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const BaseMenu = ({children}) => {
    const {info} = useSelector(state => state.user)
    return (
        <ul className=' w-full h-full list-menu'>
            <li className='px-4 py-1 hover:bg-gray-400 hover:text-white'>
                <NavLink to={`/user/info`}>Thông tin cá nhân</NavLink>
            </li>
            {children}
            <Logout className="px-4 py-1" isCustom={true}></Logout>
        </ul>
    );
};

export default BaseMenu;