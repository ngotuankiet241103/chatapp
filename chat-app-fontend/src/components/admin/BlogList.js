import React from 'react';

import blogStrategy from 'components/helper/blogStrategy';

const BlogList = ({ blogs }) => {
    console.log(blogs);

    return (
        <div className=''>
            <div className='grid grid-cols-5 gap-2 mb-4'>
                <span>Id</span>
                <span>Title</span>
                <span>Author</span>
                <span>Status</span>
                <span>Action</span>
            </div>
            <div className='flex flex-col gap-4'>
                {blogs.length > 0 && blogs.map((blog,index,arr) => {
                   
                    const Component = blogStrategy[`${blog.status}`]
                    return <Component isBorder={index === arr.length - 1} key={blog.id} blog={blog}></Component>
                })}
            </div>

        </div>
    );
};

export default BlogList;