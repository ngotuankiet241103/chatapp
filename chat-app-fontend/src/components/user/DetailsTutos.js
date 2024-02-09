import React from 'react';
import avatarMan from '../../assets/avatarMan.jpeg'
import { useSelector } from 'react-redux';
import SubjectItem from './SubjectItem';
import parse from 'html-react-parser';
import Location from 'components/Card/Location';
import { useDarkModeContext } from 'contexts/DarkModeContext';
const DetailsTutos = (props) => {
    const {isDarkMode} = useDarkModeContext()
    const user = props.user
    console.log(user);
    return (
        <div className='w-[1400px] mx-auto px-8 py-4'>
            <div className='flex items-center gap-4 mb-10 '>
                <div className='avatar w-[200px]'>
                    <img src={user.avatar || avatarMan} className='rounded-full w-full object-cover'></img>
                </div>
                <div className='px-8'>
                    <div className='mb-6'>
                        <h3 className={`text-[18px] mb-2 fullName ${isDarkMode ? 'text-sub' : ''}`}>{user.fullName}</h3>

                    </div>
                    <div className='mb-6 flex gap-4'>
                        {user.profileUser &&  user.profileUser.subjects.length > 0 && user.profileUser.subjects.map((subject,index) =>  {
                            
                            return  typeof subject === 'object' ? <SubjectItem key={subject.id}>{subject.name}</SubjectItem> : <SubjectItem key={index}>{subject}</SubjectItem>
                        })}
                    </div>
                    <Location className={`${isDarkMode ? 'text-sub' : ''}`}>{user.address}</Location>
                    
                </div>
                
            </div>
            <div className={`introduce ${isDarkMode ? 'text-sub' : ''}`}>
                <h4 className='text-primary bg-transparent border border-2 border-primary border-b-transparent inline-block p-2'>Giới thiệu</h4>
                <div className='w-full h-[2px] bg-black'></div>
                {parse(user.profileUser.introduce)}
                   
                
            </div>
        </div>

    );
};

export default DetailsTutos;