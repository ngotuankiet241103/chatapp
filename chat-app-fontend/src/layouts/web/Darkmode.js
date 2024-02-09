import React, { useState } from 'react';
import darkMode from '../../assets/darkMode.png'
import lightMode from '../../assets/lightMode.png'
import { useDarkModeContext } from 'contexts/DarkModeContext';
import useDarkModeHook from 'hooks/useDarkModeHook';
const Darkmode = () => {
    const {isDarkMode,setDarkMode} = useDarkModeContext();
    const handleDarkMode = () => {
        setDarkMode(!isDarkMode)
    }
    console.log(isDarkMode);
    return (
        <div className={`relative w-[40px] h-[20px] rounded-2xl  ${isDarkMode ?  ' bg-gray-400' : ' bg-[#D7E7E7]'}`}>
            <div className={`
                absolute top-[50%]  transition-all duration-2000 translate-y-[-50%] w-[22px] h-[22px] rounded-full   opacity-80
                ${isDarkMode ?  'right-0 bg-white' : 'left-0 bg-primary'}
                `}
                 onClick = {handleDarkMode}>
                <img srcSet= {isDarkMode ? darkMode :lightMode} className= 'absolute p-1 z-10 w-full h-full'></img>
            </div>
        </div>
    );
};

export default Darkmode;