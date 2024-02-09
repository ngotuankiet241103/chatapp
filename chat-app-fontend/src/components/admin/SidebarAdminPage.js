import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuList from './MenuList';
const inititalMenu = [
    {
        id: 1,
        link: "/manage",
        item: "manage"
    },
    {
        id: 2,
        link: "/manage/users",
        item: "users"
    },
    {
        id: 3,
        link: "/manage/blogs",
        item: "blogs"
    }
]
const SidebarAdminPage = () => {
    return (
        <div className='w-[300px] h-full px-4 py-4'>
            <MenuList menu={inititalMenu}></MenuList>
        </div>
    );
};

export default SidebarAdminPage;