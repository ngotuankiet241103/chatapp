import requestApi from 'components/helper/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Blog from './Blog';

const DetailsBlog = () => {
    const {blogId} = useParams("blogId")
    const [blog,setBlog] = useState("")
    const getBlogById = async () => {
        try {
            const id = blogId
            const response = await requestApi(`/blog/${blogId}`,"GET")
            if(response.status === 200){
                setBlog(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(blogId);
        if(blogId){
            getBlogById()
        }
    },[])
    return (
        <div>
            {blog && <Blog blog={blog}></Blog>}
        </div>
    );
};

export default DetailsBlog;