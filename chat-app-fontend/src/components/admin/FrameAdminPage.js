import React from 'react';
import HeaderAdminPage from './HeaderAdminPage';
import SidebarAdminPage from './SidebarAdminPage';
import { Outlet } from 'react-router-dom';

const FrameAdminPage = () => {
    return (
        <div>
            <div className='py-4'>
                 <HeaderAdminPage></HeaderAdminPage>
            </div>
            <div className='flex gap-4'>
                <SidebarAdminPage></SidebarAdminPage>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default FrameAdminPage;