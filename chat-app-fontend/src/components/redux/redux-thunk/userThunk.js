import requestApi from 'components/helper/api';
import React from 'react';
import { setUser } from '../reducer/userReducer';

const userThunk = () => async (dispatch,state) => {
    try {
        const response = await requestApi("/user","GET")
        console.log(response);
        if(response.status === 200 && response.data){
            dispatch(setUser({userInfo: response.data}))
        }
    } catch (error) {
        console.log(error);
    }
}

export default userThunk;