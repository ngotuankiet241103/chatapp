import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogReject = ({blog}) => {
    const redirect = useNavigate();
    const redirectPageDetals = (id) => {
        redirect(`/manage/blog/detail/${id}`)
    }
    
    return (
        <div className='grid grid-cols-5 gap-2'>
            <span>{blog.id}</span>
            <span>{blog.title}</span>
            <span>Author</span>
            <span>{blog.status}</span>
            <span>
                <button className='text-white block px-4 py-1 rounded-lg bg-green-400'  onClick={() => redirectPageDetals(blog.id)}>Details</button>
            </span>
        </div>
    );
};
export default BlogReject;