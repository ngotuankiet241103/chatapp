import requestApi from 'components/helper/api';
import TitleSection from 'components/title/TitleSection';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogList from './BlogList';
import { ToastContainer } from 'react-toastify';
import { pagination } from 'components/helper/pagination';


const ManagePost = () => {
    const redirect = useNavigate();
    const { status } = useParams("status")
    const [data, setData] = useState("")
    const [nextPage,setNextPage] = useState(1);
    const handleAddPost = (e) => {
        redirect("/manage/add-post")
    }
    const getPosts = async () => {
        try {
            const blogStatus = status.toUpperCase()
            console.log(status);
            const response = await requestApi(`/blogs/${blogStatus}?page=${nextPage}&limit=3`, "GET")
            console.log(response.data.blogs);
            if (response.status === 200) {
                console.log(response.data);
                setData(response.data)
            }
        } catch (error) {

        }
    }
    useEffect(() => {

        if (status) {
            getPosts()
        }
    }, [status,nextPage])
    useEffect(() => {
        if (data.pagination) {

            pagination({
                page: "#pagination",
                pageItem: "page-item",
                pageIcon: "page-icon",
                totalPage: data.pagination.totalsPage,
                startPage: data.pagination.pageStart,
                visiblePages: Math.floor(data.pagination.totalsPage / 3),
                onPageClick: function (page) {
                    setNextPage(page)
                },
                handleNextPage: function () {
                    this.onPageClick(this.startPage + 1);
                },
                handlePrevPage: function () {
                    this.onPageClick(this.startPage - 1);
                }
            });
        }
    }, [data.pagination])
    return (
        <>
            <div className='w-[1000px]'>
                <div className='flex justify-between'>
                    <TitleSection>Manage Post</TitleSection>
                    <button className='px-8 py-4 rounded-lg bg-primary text-white' onClick={handleAddPost}>Add Post</button>

                </div>
                <div>
                    {data.blogs && <BlogList blogs={data.blogs}></BlogList>}
                </div>
                <ul id='pagination'></ul>
            </div>
            
            <ToastContainer/>
        </>
    );
};

export default ManagePost;