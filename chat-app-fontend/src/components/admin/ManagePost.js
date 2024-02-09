import requestApi from 'components/helper/api';
import TitleSection from 'components/title/TitleSection';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogList from './BlogList';
import { ToastContainer } from 'react-toastify';


const ManagePost = () => {
    const redirect = useNavigate();
    const { status } = useParams("status")
    const [blogs, setBlogs] = useState([])
    const handleAddPost = (e) => {
        redirect("/manage/add-post")
    }
    const getPosts = async () => {
        try {
            const blogStatus = status.toUpperCase()
            console.log(status);
            const response = await requestApi(`/blogs/${blogStatus}`, "GET")
            console.log(response.data.blogs);
            if (response.status === 200) {
                setBlogs(response.data.blogs)
            }
        } catch (error) {

        }
    }
    useEffect(() => {

        if (status) {
            getPosts()
        }
    }, [status])
    return (
        <>
            <div className='w-[1000px]'>
                <div className='flex justify-between'>
                    <TitleSection>Manage Post</TitleSection>
                    <button className='px-8 py-4 rounded-lg bg-primary text-white' onClick={handleAddPost}>Add Post</button>

                </div>
                <div>
                    <BlogList blogs={blogs}></BlogList>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default ManagePost;