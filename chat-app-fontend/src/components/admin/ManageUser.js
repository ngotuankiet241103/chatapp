import React, { useEffect, useState } from 'react';

import UserItem from './UserItem';
import TitleSection from 'components/title/TitleSection';

const ManageUser = () => {
    const [users,setUsers] = useState([])
 
    useEffect(() => {
       
    },[])
    return (
        <div className='w-[1000px] mx-auto'>
            <TitleSection>Manager User</TitleSection>
            <div className='grid grid-cols-6 gap-6 mb-4 mt-8'>
                <span className="text-center">id</span>
                <span className="text-center">fullName</span>
                <span className="text-center">email</span>
                <span className="text-center">status</span>
                <span className="text-center">role</span>
                <span className="text-center">action</span>
            </div>
            <div>
                {users.length > 0 && users.map(user => (
                    <UserItem user={user}></UserItem>
                ))}
                
                
            </div>
        </div>
    );
};

export default ManageUser;