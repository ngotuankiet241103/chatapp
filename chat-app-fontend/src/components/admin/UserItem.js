import React from 'react';

const UserItem = ({key,user}) => {
    return (
        <div className='grid grid-cols-6 gap-6 mb-4' key={user.id}>
            <span className="text-center overflow-hidden">{user.id}</span>
            <span className="text-center">{user.fullName}</span>
            <span className="text-center">{user.email}</span>
            <span className="text-center">{user.status ? "active" : ""}</span>
            <span className="text-center">{user.role}</span>
            <button className='bg-primary text-white w-full rounded-lg className="text-center"'>Delete</button>
        </div>
    );
};

export default UserItem;