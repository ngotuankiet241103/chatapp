import axios from 'axios';
import requestApi, { deleteToken, getApi, getCookieValue } from 'components/helper/api';
import { showToast } from 'components/helper/toast';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Logout = ({isCustom,className}) => {
    const handleLogout = async () => {
        try {
            const refresh_token = getCookieValue("refreshToken")
            
            const data = {
                refresh_token
            }
            console.log(data);
            const response = await requestApi(`/logout`,"POST",data)
            if(response.status === 200){
                deleteToken()
                showToast("Logout success","success",600)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <li onClick={handleLogout} className={`transition-all hover:text-white ${className} ${isCustom ? 'hover:bg-gray-400' :''}`}>
           Logout
        </li>
    );
};

export default Logout;