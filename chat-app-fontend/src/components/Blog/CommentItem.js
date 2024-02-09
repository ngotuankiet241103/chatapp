import React from 'react';
import { useSelector } from 'react-redux';
import UserReply from './UserReply';
import parser from 'html-react-parser'
import AvatarUser from 'components/user/AvatarUser';
const CommentItem = ({ comment,onClick}) => {
    const { info } = useSelector(state => state.user)
    const updateCmt = () => {
        onClick()
    }
    return (

        <div class="comment-drx2">
            <div className='flex items-center gap-2'>
                <AvatarUser user={comment.user}></AvatarUser>
                <div class="box-authorComment flex-1 bg-[#F2F3F5] p-2 rounded-xl">
                    <div class="nameUser-comment font-semibold">{comment.user.fullName}</div>
                    <div class="content-comment">{parser(comment.content)}</div>
                </div>
            </div>
            <div className='ml-[44px]'>

                {info.id && <UserReply onChange={updateCmt} comment={comment} userId={info.id}></UserReply>}
            </div>
        </div>


    );
};

export default CommentItem;