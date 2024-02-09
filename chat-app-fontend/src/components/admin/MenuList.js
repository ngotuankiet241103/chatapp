import React, { useState } from 'react';
import MenuItem from './MenuItem';

const inititalMenu = [
    {
        id: 1,
        link: "/manage/blogs/pending",
        item: "pending"
    },
    {
        id: 2,
        link: "/manage/blogs/approved",
        item: "approved"
    },
    {
        id: 3,
        link: "/manage/blogs/reject",
        item: "reject"
    }
]
const MenuList = ({menu}) => {
    const [show,setShow] = useState(true)
    
    const render = (menu,index) => {
        
        if(menu.item === 'blogs') {
            return (
                <MenuItem key={menu.id} className={"relative"} onClick={() => setShow(!show)} link={menu.link} item={menu.item}>
                    <ul className={`${show ? 'block' : 'hidden'} px-4 text-black text-[16px] transition-all`}>
                       {inititalMenu.length > 0 && inititalMenu.map(menu => <MenuItem key={menu.id} className={"text-inherit"} link={menu.link} item={menu.item}></MenuItem>)}
                    </ul>
                </MenuItem>
            )
        }
        else{
            return <MenuItem key={menu.id} link={menu.link} item={menu.item}></MenuItem>
        }
    }
    return (
        <div className='flex flex-col gap-4'>
            {menu.length > 0 && menu.map(render)}
        </div>
    );
};

export default MenuList;