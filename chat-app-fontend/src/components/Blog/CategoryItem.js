import React from 'react';
import { NavLink } from 'react-router-dom';

const CategoryItem = ({code,children}) => {
    return (
        <div className='p-2 text-center text-[14px] inline-block rounded-xl bg-[#F2F2F2] font-normal'>
            <NavLink to={`/blog/topic/${code}`}>
                {children}
            </NavLink>
        </div>
    );
};

export default CategoryItem;