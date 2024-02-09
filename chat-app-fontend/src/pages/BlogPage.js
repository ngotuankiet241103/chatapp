import BlogList from 'components/Blog/BlogList';
import CategoryList from 'components/Blog/CategoryList';
import { getApi } from 'components/helper/api';
import { pagination } from 'components/helper/pagination';
import { useDarkModeContext } from 'contexts/DarkModeContext';
import Search from 'layouts/web/Search';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


const BlogPage = () => {
    const { info } = useSelector(state => state.user)
    const { isDarkMode } = useDarkModeContext()
    const { categoryCode } = useParams("categoryCode")
    const { tagCode } = useParams("tagCode")
    const [pageable, setPagination] = useState({});
    const [blogs, setBlogs] = useState([])
    const [nextPage, setPage] = useState(1);
    const [isSearch, setIsSearch] = useState(false);
    const getBlogs = async (page = nextPage) => {

        try {
            let api = "";
            const barsearch = window.location.search;
            const searchParams = new URLSearchParams(barsearch)
            const param = searchParams.get("search")
            console.log(param);
            let search = "";
            if (param) {
                search += `search=${param}&`
            }
            if (categoryCode) {
                api = `/blogs/topic/${categoryCode}?${search}page=${page}&limit=1`
            }
            else if (tagCode) {
                api = `/blogs/tag/${tagCode}?${search}page=${page}&limit=1`
            }
            else {
                api = `/blogs?${search}page=${page}&limit=1`
            }
            const response = await getApi(api)
            console.log(response);
            setBlogs(response.blogs)
            setPagination(response.pagination)
        } catch (error) {

        }
    }
    useEffect(() => {
        getBlogs()
    }, [nextPage, tagCode, categoryCode, isSearch])
    useEffect(() => {
        if (pageable) {

            pagination({
                page: "#pagination",
                pageItem: "page-item",
                pageIcon: "page-icon",
                totalPage: pageable.totalsPage,
                startPage: pageable.pageStart,
                visiblePages: Math.floor(pageable.totalsPage / 3),
                onPageClick: function (page) {
                    setPage(page)
                },
                handleNextPage: function () {
                    this.onPageClick(this.startPage + 1);
                },
                handlePrevPage: function () {
                    this.onPageClick(this.startPage - 1);
                }
            });
        }
    }, [pageable])
    const handleSearchBlog = (value) => {

        const search = window.location.search;
        const searchParams = new URLSearchParams(search)
        const url = new URL(window.location.href)
        searchParams.set("search", value)
        const param = searchParams.toString()

        window.history.replaceState("", "", `${url.origin}${url.pathname}?${param}`)
        setIsSearch(!isSearch)
    }
    return (
        <div className={`${isDarkMode && 'bg-dark-section'} h-[100%]`}>
            <div className='w-[1240px] mx-auto py-2'>
                <div className='flex justify-end gap-4'>
                    {info && info.roleName === 'TUTOR' &&
                        <>
                            <NavLink to={"/my-blog/all"}>
                                <button className='px-4 py-2 rounded-lg bg-primary text-white'>Bài viết của tôi</button>
                            </NavLink>
                            <NavLink to={"/blog/add"}>
                                <button className='px-4 py-2 rounded-lg bg-primary text-white'>Add blog</button>
                            </NavLink>
                        </>
                    }
                </div>
                <h1 className={`text-[48px] font-semibold ${isDarkMode && 'text-white'}`}>Bài viết mới nhất</h1>
                <p className={`mb-10 ${isDarkMode && 'text-sub'} `}>Tổng hợp các bài viết chia sẻ về các kiến thức và các phương pháp học tập.</p>
                <div className='flex gap-8'>
                    <BlogList blogs={blogs}></BlogList>
                    <div>
                        <CategoryList></CategoryList>
                        <Search onChange={handleSearchBlog} placeholder="Search blog"></Search>
                    </div>
                </div>
                <ul class="pagination" id="pagination"></ul>
            </div>
        </div>
    );
};

export default BlogPage;