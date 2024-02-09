import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { useDarkModeContext } from 'contexts/DarkModeContext';
const MenuList = ({menu,className}) => {
    
    return (
        <div className={className}>
            {menu.length > 0 && menu.map(menuItem => <MenuItem key={menuItem.id} link={menuItem.link} item={menuItem.item}></MenuItem>)}
        </div>
    );
};
MenuList.prototype = {
    menu: PropTypes.array,
    className: PropTypes.string
}
export default MenuList;