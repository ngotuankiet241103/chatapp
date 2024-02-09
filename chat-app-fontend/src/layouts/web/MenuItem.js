import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import useDarkModeHook from 'hooks/useDarkModeHook';

const MenuItem = ({link,className,item}) => {
    const {isDarkMode} = useDarkModeContext();
    const cssNavLink = `text-[18px] capitalize font-medium`;
    return <NavLink to={link} className={({isActive}) => isActive ? `text-primary ${cssNavLink} ${className}` : `${isDarkMode ? 'text-white' : 'text-black'} ${cssNavLink} ${className}`}>{item}</NavLink>
};
MenuItem.prototypes = {
    link: PropTypes.string,
    className: PropTypes.string,
    item: PropTypes.string
}
export default MenuItem;