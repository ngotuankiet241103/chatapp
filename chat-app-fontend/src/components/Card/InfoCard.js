import SubjectItem from 'components/user/SubjectItem';
import React from 'react';
import Location from './Location';

const InfoCard = ({user ,isDarkMode}) => {
    console.log(user.profileUser.subjects);
    return (
        <div className='py-3'>
            <h3 className={ ` mb-2 ${isDarkMode && 'text-white'}`}>{user.fullName}</h3>
            <div className='flex gap-4 mb-2'>
                {user.profileUser.subjects.length > 0 && user.profileUser.subjects.map((subject,index) => <SubjectItem key={index}>{subject}</SubjectItem>)}
            </div>
            <Location className={`${isDarkMode ? 'text-white' : ''} mb-2`}>{user.address}</Location>
        </div>
    );
};

export default InfoCard;