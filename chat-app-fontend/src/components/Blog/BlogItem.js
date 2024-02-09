import React from 'react';
import Tag from './Tag';
import avatarMan from '../../assets/avatarMan.jpeg'
import { NavLink } from 'react-router-dom';
const BlogItem = ({blog,isDarkMode,link}) => {
    console.log(blog);
    return (
        <div className=' w-full h-[200px] rounded-xl shadow-sm p-4 flex gap-4 mb-4 border border-2 border-[#e8e8e8]'>
            <div className={`${link ? 'w-[50%]' : 'w-[70%]'}`}>
                <div className='author mb-2 flex items-center h-[36px] '>
                    <img srcSet={avatarMan} alt='avatar' className='h-full rounded-full mr-2'></img>
                    <h4 className={`${isDarkMode ? 'text-sub' : 'text-gray-600'}`}>Alex</h4>
                </div>
                <h2 className={`font-semibold ${isDarkMode && 'text-sub'}`}>
                    <NavLink to={`/blog/detail/${blog.code}`} >{blog.title}</NavLink>
                </h2>
                <p className={`mb-3 ${isDarkMode && 'text-sub'}`}>
                    lorem ispum how old are you
                </p>
                <div className='flex gap-3'>
                    {blog.tagId && blog.tagId.map(tag =>  <Tag>{tag}</Tag>)}
                </div>
            </div>
            <div className='w-[30%] h-full'>
                <div className={`mb-2 text-right ${isDarkMode && 'text-sub'}`}>
                    <i class="fa-regular fa-bookmark"></i>
                </div>
                <div className='w-full h-[80px]'>
                    <img src={blog.image} className='w-full h-full object-contain'></img>
                </div>
            </div>
            {link && 
                <div className='w-[20%] flex items-center justify-center'>
                    <button className='px-4 py-2 rounded-lg bg-primary text-sub'>
                        <NavLink to={link}>Chỉnh sửa</NavLink>
                    </button>
                </div>
            }
        </div>
    );
};

export default BlogItem;