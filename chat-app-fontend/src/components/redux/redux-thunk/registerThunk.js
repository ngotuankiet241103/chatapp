import React from 'react';
import requestApi, { setToken } from 'components/helper/api';
import { setUser } from '../reducer/userReducer';
import axios from 'axios';
const registerThunk = (user) => async (dispatch,state)  => {
    try {
        const response = await  axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`,user)
        console.log(response);
        setToken(response.data);
        if(response.status === 200){

            const userInfo = await requestApi("/user","GET");
            dispatch(setUser({userInfo: userInfo.data}))
        }
    } catch (error) {
        
    }
};

export default registerThunk;