import requestApi from 'components/helper/api';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import banner from '../assets/banner.jpg'
import { NavLink } from 'react-router-dom';
import { useDarkModeContext } from 'contexts/DarkModeContext';
const HomePage = () => {
    const { isDarkMode } = useDarkModeContext()
    return (
        <div className={`${isDarkMode ? 'bg-dark-second' : 'bg-black'}`}>
            <div className={`flex mt-10 ${isDarkMode ? 'bg-dark-second' : 'bg-black'}`}>
                <div className='flex-1'>
                    <img srcSet={banner}></img>
                </div>
                <div className='flex-1 px-4 flex flex-col justify-center items-center shadow-gray-500 bg-white '>
                    <h4 className='text-[44px] font-semibold'>Welcome to website</h4>
                    <p className='text-center mb-4'>Purpose build website to help tutors and students connect together and tutors can write blog so share knowlegde for children</p>
                    <div className='flex'>
                        <button className='text-white mx-auto px-4 py-2 rounded-lg bg-primary border-none'>
                            <NavLink to={"/login"}>Get started</NavLink>
                        </button>
                    </div>.
                </div>
            </div>
        </div>
    );
};

export default HomePage;