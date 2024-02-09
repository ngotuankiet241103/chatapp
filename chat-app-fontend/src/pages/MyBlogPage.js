import BlogList from 'components/Blog/BlogList';
import requestApi from 'components/helper/api';
import { pagination } from 'components/helper/pagination';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import MenuList from 'layouts/web/MenuList';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const initialMenu = [
    {
        id: 1,
        link: "/my-blog/all",
        item: "all"
    },
    {
        id: 2,
        link: "/my-blog/approved",
        item: "approved"
    },
    {
        id: 3,
        link: "/my-blog/reject",
        item: "reject"
    }, 
    {
        id: 4,
        link: "/my-blog/pending",
        item: "pending"
    }
]
const MyBlogPage = () => {
    const {isDarkMode} = useDarkModeContext();
    const {info} = useSelector(state => state.user)
    const [data,setData] = useState({});
    const [nextPage,setNextPage] = useState(1)
    const {statusBlog} = useParams("statusBlog");
    const getParam = () => {
        
        return statusBlog ? statusBlog : 'all'
    }
    useEffect(() => {
        async function getBlogs() {
            try {
                const param = getParam()
                if(info.id){
                    
                    const response = await requestApi(`/blogs/${info.id}/user?status=${param}&page=${nextPage}&limit=1`,"GET")
                    console.log(response);
                    if(response.status === 200){
                        setData(response.data)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBlogs()
    },[nextPage,statusBlog,info.id])
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
        <div className={`${isDarkMode && 'bg-dark-section'} h-[100%]`}>
        <div className='w-[1240px] mx-auto py-2'>
            <div className=''>
                <MenuList className="flex gap-4" menu={initialMenu}></MenuList>
            </div>
            <h1 className={`text-[48px] font-semibold ${isDarkMode && 'text-white'}`}>Bài viết của tôi</h1>
            <p className={`mb-10 ${isDarkMode && 'text-sub'} `}>Tổng hợp các bài viết chia sẻ về các kiến thức và các phương pháp học tập.</p>
            <div className='flex gap-8'>
                <BlogList link={true}  blogs={data?.blogs}></BlogList>
                
            </div>
            <ul class="pagination" id="pagination"></ul>
        </div>
    </div>
    );
};

export default MyBlogPage;