import React from 'react';
import requestApi, { setToken } from 'components/helper/api';
import { setUser } from '../reducer/userReducer';
const registerThunk = (user) => async (dispatch,state)  => {
    try {
        const response = await requestApi("/register","POST",JSON.stringify(user))
       
        setToken(response.data);
        if(response.status === 200){

            const userInfo = await requestApi("/user","GET");
            dispatch(setUser({userInfo: userInfo.data}))
        }
    } catch (error) {
        
    }
};

export default registerThunk;