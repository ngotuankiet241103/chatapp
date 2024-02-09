import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { useSelector } from 'react-redux';

import CommentReply from 'components/Blog/CommentReply';
import requestApi, { getApi } from 'components/helper/api';
import CommentRoot from 'components/Blog/CommentRoot';
import AvatarUser from 'components/user/AvatarUser';
import { NavLink } from 'react-router-dom';
const Blog = ({ blog }) => {
    const { info } = useSelector(state => state.user)
    const [showModalComment, setShowComment] = useState(false)
    const [comments, setComments] = useState({})
    const [components, setComponents] = useState([])
    const [isNewComment,setIsNewComment] = useState(false);
    const [totalLike,setTotalLike] = useState(0)
    const [isLike,setIsLike] = useState(false);

    const handleShowModal = () => {
        setShowComment(!showModalComment);

    }
    const getComments = async () => {
        try {
            const response = await getApi(`/comments/${blog.id}`)
            setComments(response)
        } catch (error) {
            console.log(error);
        }
    }
    const render = () => {
        let htmls = []
        for (const [key, value] of Object.entries(comments)) {
            let commentRoot = null;
            let RootComment = ""
            let childComments = []
            let comment = null;
            console.log(value);
            value.forEach((cmt, index, arr) => {

                let depth = 0;
                value.forEach((subCmt) => {
                    if (subCmt.node_left < cmt.node_left && subCmt.node_right > cmt.node_right) {
                        depth++;
                    }
                });
                if (depth === 0) {
                    console.log(cmt);
                    console.log("root");
                    commentRoot = cmt
                    RootComment = CommentRoot
                }
                else {
                    childComments = [...childComments, (<CommentReply onClick={() => setIsNewComment(!isNewComment)} key={cmt.id} comment={cmt}></CommentReply>)]
                }
                if (index === arr.length - 1) {
                    comment = <RootComment onClick={() => setIsNewComment(!isNewComment)} key={commentRoot.id} comment={commentRoot} arr={arr} commentsReply={childComments}>
                        
                    </RootComment>
                }
            })

            htmls = [
                ...htmls,
                comment
            ]


        }
        setComponents(htmls)

    }
    const getLike = async () => {
        try {
            const response = await getApi(`/blog/${blog.id}/like`)
            setTotalLike(response.total)
            
        } catch (error) {
            console.log(error);
        }
    }
    const checkLikeBlog = async () => {
        try {
            const data = await getApi(`/blog/${blog.id}/like/${info.id}`)
            setIsLike(data.isLike)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        if (comments) {
            render()
        }
    }, [comments])
    useEffect(() => {
        if(info.id) {
            checkLikeBlog()
        }
        getLike()
        getComments()
    }, [isNewComment])
    
    const handleSendCmt = async (e) => {
        const sendMessage = async (data) => {
            try {
                const reseponse = await requestApi("/comment","POST",data)
                if(reseponse.status === 200){
                    console.log("comment successed");
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(e.keyCode === 13){
            const data = {
                content: e.target.value.trim(),
                blogId: blog.id,
                tree_id: null,
                node_left: null,
                node_right: null,
                parent_id: null,
                userId: info.id
            }
            await sendMessage(data)
            e.target.value = ""
            setIsNewComment(!isNewComment)
        }
    }
    const heartDrop = async () => {
        try {
            const data = {
                blogId: blog.id,
                userId: info.id

            }
            const response = await requestApi(`/blog/like`,"POST",data);
            if(response.status === 200){
                setIsLike(true)
                setTotalLike(totalLike => ++totalLike)
            }

        } catch (error) {
            console.log(error);
        }
    }
    const cancelHeartDrop = async () => {
        try {
            const response = await requestApi(`/blog/${blog.id}/like/${info.id}`,"PUT",{})
            if(response.status === 200){
                setIsLike(false)
                setTotalLike(totalLike => --totalLike)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const tabHeart = (e) => {
        const element = e.target;
        if(element.className.includes('active')){
            cancelHeartDrop()
        }
        else{
            heartDrop()
        }
    }
    return (
        <>

            <div className='md:w-[1200px] md:mx-auto py-4 max-sm:px-2'>
                <h2 className='mb-4 text-center font-semibold text-[32px]'>{blog.title}</h2>
                <div className='mb-4 text-center '>
                    {parse(blog.content)}
                </div>
                <div className='flex justify-end gap-4 items-start '>
                    <span className='text-[20px] flex flex-col items-center'>
                        <i className={`fa-solid fa-heart ${isLike && 'active'} ${isLike &&`text-red-500`}`} onClick={tabHeart}></i>
                        {totalLike > 0 && <span className='block'>{totalLike}</span>}
                    </span>
                    <span className='flex text-[20px]' onClick={handleShowModal}><i className="fa-solid fa-comment"></i></span>
                </div>
            </div>
            <div className={`modal-comment overflow-y-auto ${showModalComment ? 'active' : ''}`}>
                <div className="form-comment w-[300px]">
                    <div className="header-close" >
                        <span onClick={handleShowModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>

                    </div>
                    <h4>Bình luận</h4>
                    <div className="rootComment">
                        {info.id && <input
                            type="text"
                            className="inputComment"
                            placeholder="Nhập suy nghĩ của bạn"
                            onKeyUp={handleSendCmt}
                        />}
                    </div>
                    <ul className="comments">
                        {components.length > 0 && components.map(Component => Component)}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Blog;