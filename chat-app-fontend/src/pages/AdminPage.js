import HeaderAdminPage from 'components/admin/HeaderAdminPage';
import requestApi from 'components/helper/api';
import TitleSection from 'components/title/TitleSection';
import React, { Component, useEffect, useState } from 'react';

import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AdminPage = () => {
    const [data,setData] = useState({
        user: "",
        blog: ""
    })
   
    useEffect(() => {
        const getUsersRegister = async () => {
            try {
                const response = await requestApi("/users/register","GET")
                if(response.status === 200){
                    setData({
                        ...data,
                        user: response.data
                    })
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        const getBlogCreated = async () => {
            try {
                const response = await requestApi("/blogs/created","GET")
                if(response.status === 200){
                    setData({
                        ...data,
                        blog: response.data
                    })
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getBlogCreated();
        getUsersRegister()
    },[])
    return (
        <div>
            <div className='w-[1000px]'>
                <div className='flex justify-between'>
                    <TitleSection>Dashboard</TitleSection>
                </div>
                <div>
                    {data.user && data.blog && <BoxCardList data={data}></BoxCardList>}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
const BoxCardList = ({data}) => {
    console.log(data);
    const Render = () => {
        const results = Object.entries(data).map(([key, value]) => {
            
            return Object.entries(value).map(([key2, value2]) => {
                console.log(key2,value2);
               return <BoxCard color='primary' title={`${message[key]}${key2}`} text={value2}></BoxCard>
            })
        })
        return  results.map(result => result.map(component => component));
    }
    return <div className='flex gap-4'>
         <Render></Render>
    </div>
}
const message = {
    user: "Tổng số user đăng kí ",
    blog: "Tổng số blog đã được tạo "
}
const BoxCard = ({title,text,color = 'primary'}) => {
    console.log(title);
    console.log(text);
    return (
        <div className={`p-2 bg-${color}  rounded-lg` }>
            <span className='block text-white'>{title}</span>
            <span className='text-white text-center block'>{text}</span>
        </div>
    )
}
export default AdminPage;