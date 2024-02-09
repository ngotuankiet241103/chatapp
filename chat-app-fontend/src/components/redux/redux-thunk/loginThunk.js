import requestApi, { setToken } from 'components/helper/api';
import React from 'react';
import { setUser } from '../reducer/userReducer';

const loginThunk = (user) => async (dispatch,state) => {
    try {
        const response = await requestApi("/login","POST",JSON.stringify(user))
        setToken(response.data);
        const userInfo = await requestApi("/user","GET");
        console.log(userInfo);
        dispatch(setUser({userInfo: userInfo.data}))
    } catch (error) {
        console.log(error);
    }
}

export default loginThunk;