import React from 'react';
import BaseMenu from './BaseMenu';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MenuTutor = () => {
    const {info} = useSelector(state => state.user)
    return (
        <BaseMenu>
            <li className='px-4 py-1 hover:bg-gray-400 hover:text-white'>
                {info.teached ? 
                    <NavLink to={`/user/profile/${info.id}`}>Thông tin giảng dạy</NavLink> :
                    <NavLink to={`/user/introduce/register`}>Cập nhập thông tin giảng dạy</NavLink>
                }
                
            </li>
        </BaseMenu>
    );
};

export default MenuTutor;