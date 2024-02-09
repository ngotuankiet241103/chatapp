import requestApi from 'components/helper/api';
import { showToast } from 'components/helper/toast';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogPending = ({ blog,isBorder }) => {
    const redirect = useNavigate();
    const handleAcceptBlog = async (id) => {
        try {
            const response = await requestApi(`/blog/approved/${id}`, "PUT")
            if (response.status === 200) {
                showToast("Update blog success","success")
            }
        } catch (error) {
            showToast(error, "error")
        }
    }
    const handleRejectBlog = async (id) => {
        try {
            const response = await requestApi(`/blog/reject/${id}`, "PUT")
            if (response.status === 200) {
                showToast("Update blog success","success")
            }
        } catch (error) {
            showToast(error, "error")
        }
    }
    
    const redirectPageDetals = (id) => {
        redirect(`/manage/blog/detail/${id}`)
    }
    return (
            <div className={`grid grid-cols-5 py-2 gap-2 ${isBorder ? '' : 'border border-transparent border-b-gray-400'}` }>
                <span>{blog.id}</span>
                <span>{blog.title}</span>
                <span>Author</span>
                <span>{blog.status}</span>
                <span className='flex flex-col gap-2'>
                    <button className='text-white block px-4 py-1 rounded-lg bg-green-400' onClick={() => redirectPageDetals(blog.id)}>Details</button>
                    <button className='text-white block px-4 py-1 rounded-lg bg-primary' onClick={() => handleAcceptBlog(blog.id)}>Accept</button>
                    <button className='text-white block px-4 py-1 rounded-lg bg-red-500' onClick={() => handleRejectBlog(blog.id)}>Reject</button>
                </span>
            </div>
        
        
    );
};

export default BlogPending;