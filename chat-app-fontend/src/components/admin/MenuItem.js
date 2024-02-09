import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuItem = ({link,className,item,children,onClick}) => {
    const cssNavLink = `text-[18px] capitalize font-medium`;
    return <NavLink  to={link} className={({isActive}) => isActive ? `text-primary ${cssNavLink} ${className}` : `text-black ${cssNavLink} ${className}`}>
        <div onClick={onClick}>
            {item}
        </div>
        {children}
    </NavLink>
};
MenuItem.prototypes = {
    link: PropTypes.string,
    className: PropTypes.string,
    item: PropTypes.string
}
export default MenuItem;