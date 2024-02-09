import React from 'react';
import BlogItem from './BlogItem';
import { useDarkModeContext } from 'contexts/DarkModeContext';

const BlogList = ({blogs,link}) => {
    const {isDarkMode} = useDarkModeContext()
    const Render = () => {
        if(blogs && blogs.length > 0){
            return blogs.map(blog => <BlogItem isDarkMode={isDarkMode} link={link && `/blog/edit/${blog.id}`} key={blog.id} blog={blog}></BlogItem>)
        }
    }
    return (
        <div className='w-[70%]'>
           <Render></Render>
        </div>
    );
};

export default BlogList;