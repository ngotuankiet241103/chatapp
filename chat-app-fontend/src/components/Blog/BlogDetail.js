import Blog from 'components/admin/Blog';
import { getApi } from 'components/helper/api';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const {code} = useParams("code")
    const {isDarkMode} = useDarkModeContext();
    const [blog,setBlog] = useState("")
    const getBlog = async () => {
        try {
            const response = await getApi(`/blog/detail/${code}`)
            setBlog(response)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(code) {
            getBlog();
        }
    },[code])
    return (
        <div className={`h-[100vh] ${isDarkMode ? 'bg-[#f1f0ee]' : ''}`}>
           {blog && <Blog blog={blog}></Blog>} 
        </div>
    );
};

export default BlogDetail;