import React, { useEffect, useState,Suspense } from 'react';
import logo from '../../assets/logo.png'
import Search from './Search';
import MenuList from './MenuList';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Darkmode from './Darkmode';
import { useDispatch, useSelector } from 'react-redux';
import AvatarUser from 'components/user/AvatarUser';
import userThunk from 'components/redux/redux-thunk/userThunk';
import useSocketHook from 'hooks/useSocketHook';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import useDarkModeHook from 'hooks/useDarkModeHook';
import FeatureUser from 'components/user/FeatureUser';
import { ToastContainer } from 'react-toastify';
import Loading from 'components/loading/Loading';

const inititalMenu = [
    {
        id: 1,
        link: "/home",
        item: "home"
    },
    {
        id: 2,
        link: "/tutors",
        item: "tutors"
    },
    {
        id: 3,
        link: "/blog",
        item: "blog"
    }
]
const inititalMenuMobile = [
    ...inititalMenu,
    {
        id: 4,
        link: "/login",
        item: "sign in"
    }
]
const cb = (message) => {
    console.log(message.body);
}
const Header = () => {
    const { isDarkMode } = useDarkModeContext();
    const user = useSelector(state => state.user)
    const { info } = user;
    const [isShow, setShow] = useState(false)
    const dispatch = useDispatch()
    console.log(useSocketHook());
    console.log(user);
    useEffect(() => {
        if (user && info) {
            let url = `${process.env.REACT_APP_URL_WEBSOCKET}`
            let socket = new SockJS(url);
            const stomp = Stomp.over(socket);
            stomp.connect({}, onConnected, onError);
            function onError(error) {
                console.log(
                    error
                );
            }
            function onConnected() {
                console.log("connect success");
                console.log(stomp);
                stomp.send("/app/user.addUser", {}, JSON.stringify({ emails: info.emails }))
            }
            window.onbeforeunload = function (e) {

                let url = `${process.env.REACT_APP_URL_WEBSOCKET}`
                let socket = new SockJS(url);
                const stomp = Stomp.over(socket);
                stomp.connect({}, onConnected, onError);
                function onError(error) {
                    console.log(
                        error
                    );
                }
                function onConnected() {
                    console.log("connect success");
                    console.log(stomp);
                    stomp.send("/app/user.disconnectUser", {}, JSON.stringify({ emails: info.emails }))

                };

            };
            window.onunload = function (e) {
                e.preventDefault();
                alert("hello")
                let url = `${process.env.REACT_APP_URL_WEBSOCKET}`
                let socket = new SockJS(url);
                const stomp = Stomp.over(socket);
                stomp.connect({}, onConnected, onError);
                function onError(error) {
                    console.log(
                        error
                    );
                }
                function onConnected() {
                    console.log("connect success");
                    console.log(stomp);
                    stomp.send("/app/user.disconnectUser", {}, JSON.stringify({ emails: info.emails }))

                };

            };
        }
    }, [user])
    useEffect(() => {
        dispatch(userThunk())


    }, [])
    const toggleMenu = () => {
        setShow(!isShow)
    }
    const handleCloseToast = () => window.location.reload()
    return (
        <>
            <div className={`${isDarkMode && 'dark:bg-black border-b-gray-400  '} z-50`}>

                <div className={`md:w-[1400px] mx-auto py-2 dark max-sm:px-2 `}>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <Link to={"/home"}>
                                <img src={logo} />
                            </Link>
                            <div className='md:block max-sm:hidden'>
                                <Search placeholder="Search in app"></Search>

                            </div>
                        </div>

                        <div className='flex items-center gap-4 max-sm:relative'>

                            <MenuList className='flex items-center gap-5 max-sm:hidden max-[600px]:bg-sky-300' menu={inititalMenu}></MenuList>
                            <div className={`max-sm:w-[80%] max-sm:h-[100vh] 
                                        z-40 max-sm:fixed max-sm:right-0 max-sm:top-0 
                                        max-sm:bg-sub sm:hidden
                                        ${isShow ? 'max-sm:block' : 'max-sm:hidden'}
                                        
                                        `}>
                                <div className='max-sm:px-4 max-sm:py-6'>
                                    <div className={`max-sm:flex max-sm:justify-end max-sm:px-4`} >

                                        <i class={`fa-solid fa-xmark max-sm:text-[20px]   `}onClick={toggleMenu}></i>
                                    </div>
                                    <MenuList className='flex  gap-5 flex-col' menu={inititalMenu}></MenuList>
                                </div>
                            </div>

                            <Darkmode></Darkmode>
                            <div className='md:hidden max-sm:block' onClick={toggleMenu}>
                                <i class={`fa-solid fa-bars ${isDarkMode ? 'text-[#fff]':''}`}></i>
                            </div>
                            {user && user.isLogin ? <div><FeatureUser></FeatureUser></div> : <div className=''><NavLink to={"/login"} className='bg-primary rounded-lg py-2 px-4 text-white font-normal'>Sign in</NavLink></div>}
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<Loading></Loading>}>

                <Outlet></Outlet>
            </Suspense>
            <ToastContainer onClose={handleCloseToast}/>


        </>

    );
};

export default Header;