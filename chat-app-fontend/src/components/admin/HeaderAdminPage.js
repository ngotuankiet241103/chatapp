import React, { useEffect } from 'react';
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import userThunk from 'components/redux/redux-thunk/userThunk';
import AvatarUser from 'components/user/AvatarUser';
const inititalMenu = [
    {
        id: 1,
        link: "/manage",
        item: "dashboard"
    },
    {
        id: 2,
        link: "/tutors",
        item: "users"
    },
    {
        id: 3,
        link: "/blogs",
        item: "blogs"
    }
]
const HeaderAdminPage = () => {
    const {info} = useSelector(state => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userThunk())


    }, [])
    return (
        <div className='flex py-4 justify-between items-center w-[1400px] mx-auto'>
            <div className=''>
                <img src={logo}></img>
            </div>
            <div className='font-semibold text-[18px]'>
                <AvatarUser user={info}></AvatarUser>
            </div>
        </div>
    );
};

export default HeaderAdminPage;