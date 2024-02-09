import React from 'react';
import InfoCard from './InfoCard';
import Button from 'components/Button/Button';
import { NavLink } from 'react-router-dom';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import { useSelector } from 'react-redux';

const CardItem = ({item,onClick}) => {
    const {info} = useSelector(state => state.user)
    const {isDarkMode} = useDarkModeContext()
    return (
        <div className={`w-full  rounded-lg p-4 shadow-md ${isDarkMode && 'border border-[rgb(187,188,189)]'}`}>
            <div className='w-full h-[120px]'>
                <img className='w-full rounded-lg h-full object-cover' src={item.avatar}></img>
            </div>
            <InfoCard isDarkMode={isDarkMode} user={item}></InfoCard>
            <div className='flex gap-4 '>
                <Button onClick={() => onClick(item.id)}>Liên hệ</Button>
                <Button>
                    <NavLink to={info.id ? `/user/profile/${item.id}` : '/login'}>Xem thông tin</NavLink>
                </Button>
            </div>
        </div>
    );
};

export default CardItem;