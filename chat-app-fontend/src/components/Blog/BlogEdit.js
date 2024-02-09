import React, { useEffect, useState } from 'react';
import FormEditBlog from './FormEditBlog';
import { getApi } from 'components/helper/api';
import { useParams } from 'react-router-dom';
import { useDarkModeContext } from 'contexts/DarkModeContext';

const BlogEdit = () => {
    const {isDarkMode} = useDarkModeContext()
    const [blog, setBlog] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const { blogId } = useParams("blogId")
    const [isLoading, setLoading] = useState(true)
    const getCategories = async () => {
        try {
            const response = await getApi("/categories")
            setCategories(response)
        } catch (error) {
            console.log(error);
        }
    }
    const getTags = async () => {
        try {
            const response = await getApi("/tags")
            setTags(response)

        } catch (error) {
            console.log(error);
        }
    }
    const getBlog = async () => {
        try {

            const response = await getApi(`/blog/${blogId}`)
            setBlog(response)
        } catch (error) {
            console.log(error);
        }
    }
    const getAllApi = async () => {
        await getBlog();
        await getCategories();
        await getTags();
        
        setLoading(false)
    }
    useEffect(() => {
        getAllApi()
    }, [])
    function Render(){
        return blog && categories.length > 0 
        && tags.length > 0 && <FormEditBlog isDarkMode={isDarkMode} blog={blog} categories={categories} tags={tags} ></FormEditBlog>
    }
    return (
        <>
            
            <Render></Render>
        </>
    );

};

export default BlogEdit;